package model.userBike;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class DbMods {
    /*
     * Returns a "StringData" object that is full of field level validation
     * error messages (or "" for any field that passes validation).
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*
         * Useful to copy field names from StringData as a reference
         * public String bikeId = ""; // auto-increment primary key
         * public String bikeName = ""; // varChar 45, must be unique
         * public String bikeImage = ""; // varChar 500, required (length >=1)
         * public String bikePrice = ""; // type decimal, optional
         * public String yearManufactured = ""; // type year, optional
         * public String bikeBrand = ""; // varChar 45, required (length >=1)
         * public String bikeModel = ""; // varChar 45, required (length >=1)
         * public String bikeType = ""; // varChar 45, required (length >=1)
         * public String webUserId = ""; // foreign key (integer), required by DB
         */

        // Validation
        errorMsgs.bikeName = Validate.stringMsg(inputData.bikeName, 45, true);
        errorMsgs.bikeImage = Validate.stringMsg(inputData.bikeImage, 500, false);
        errorMsgs.bikePrice = Validate.decimalMsg(inputData.bikePrice, false);
        errorMsgs.yearManufactured = Validate.yearMsg(inputData.yearManufactured, false);
        errorMsgs.bikeBrand = Validate.stringMsg(inputData.bikeBrand, 45, false);
        errorMsgs.bikeModel = Validate.stringMsg(inputData.bikeModel, 45, false);
        errorMsgs.bikeType = Validate.stringMsg(inputData.bikeType, 45, false);
        errorMsgs.webUserId = Validate.integerMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            // Start preparing SQL statement
            String sql = "INSERT INTO user_bike (bike_name, bike_image, bike_price, year_manufactured, " +
                    "bike_brand, bike_model, bike_type, web_user_id) values (?,?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.bikeName);
            pStatement.setString(2, inputData.bikeImage);
            pStatement.setBigDecimal(3, Validate.convertDecimal(inputData.bikePrice));
            pStatement.setInt(4, Validate.convertYear(inputData.yearManufactured));
            pStatement.setString(5, inputData.bikeBrand);
            pStatement.setString(6, inputData.bikeModel);
            pStatement.setString(7, inputData.bikeType);
            pStatement.setInt(8, Validate.convertInteger(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That bike name is already taken - " + errorMsgs.errorMsg;
            }

        }
        return errorMsgs;
    } // insert

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // Double checking id is not null, even though already tested in controller
        if (id == null) {
            sd.errorMsg = "Cannot getById (bike): id is null";
            return sd;
        }
    
        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (bike): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
    
        try {
            String sql = "SELECT bike_id, bike_name, bike_image, bike_price, year_manufactured, "
                    + "bike_brand, bike_model, bike_type, user_bike.web_user_id, web_user.user_email "
                    + "FROM user_bike, web_user WHERE user_bike.web_user_id = web_user.web_user_id "
                    + "AND bike_id = ?";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
    
            // Encode the id into the select statement
            stmt.setInt(1, intId);
    
            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
    
                // Format and set each field from the result set
                sd.bikeId = Format.fmtInteger(results.getObject("bike_id"));
                sd.bikeName = Format.fmtString(results.getObject("bike_name"));
                sd.bikeImage = Format.fmtString(results.getObject("bike_image"));
                sd.bikePrice = Format.fmtDollar(results.getObject("bike_price"));
                // Fix for year formatting - convert Integer to String directly
                Object yearObj = results.getObject("year_manufactured");
                sd.yearManufactured = (yearObj != null) ? yearObj.toString() : "";
                sd.bikeBrand = Format.fmtString(results.getObject("bike_brand"));
                sd.bikeModel = Format.fmtString(results.getObject("bike_model"));
                sd.bikeType = Format.fmtString(results.getObject("bike_type"));
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
    
            } else {
                sd.errorMsg = "Bike Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.userBike.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById

    public static StringData update(StringData updateData, DbConn dbc) {
        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that bikeId has been supplied
        errorMsgs.bikeId = Validate.integerMsg(updateData.bikeId, true);

        if (errorMsgs.characterCount() > 0) { // at least one field has an error
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;
        } else { // all fields passed validation

            String sql = "UPDATE user_bike SET bike_name=?, bike_image=?, bike_price=?, " +
                    "year_manufactured=?, bike_brand=?, bike_model=?, bike_type=?, " +
                    "web_user_id=? WHERE bike_id=?";

            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode values into the prepared statement
            pStatement.setString(1, updateData.bikeName);
            pStatement.setString(2, updateData.bikeImage);
            pStatement.setBigDecimal(3, Validate.convertDecimal(updateData.bikePrice));
            pStatement.setInt(4, Validate.convertYear(updateData.yearManufactured)); 
            pStatement.setString(5, updateData.bikeBrand);
            pStatement.setString(6, updateData.bikeModel);
            pStatement.setString(7, updateData.bikeType);
            pStatement.setInt(8, Validate.convertInteger(updateData.webUserId));
            pStatement.setInt(9, Validate.convertInteger(updateData.bikeId));

            int numRows = pStatement.executeUpdate();

            // Process results and return error messages if any
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) { // no error message
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // means SUCCESS
                } else {
                    errorMsgs.errorMsg = numRows + " records were updated when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That bike name is already taken - " + errorMsgs.errorMsg;
            }
        }
        return errorMsgs;
    }

    public static StringData delete(DbConn dbc, String bikeId) {
        StringData sd = new StringData();
    
        if (bikeId == null) {
            sd.errorMsg = "Error: cannot delete bike record because 'bikeId' is null";
            return sd;
        }
    
        try {
            String sql = "DELETE FROM user_bike WHERE bike_id = ?";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, bikeId);
    
            int numRowsDeleted = stmt.executeUpdate();
    
            if (numRowsDeleted == 0) {
                sd.errorMsg = "Record not deleted - there was no record with bike_id " + bikeId;
            } else if (numRowsDeleted > 1) {
                sd.errorMsg = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }
    
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.userBike.DbMods.delete(): " + e.getMessage();
        }
    
        return sd;
    }

}