package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.userBike.*;
import dbUtils.*;

public class UserBikeView {

    public static StringDataList getAllUsers(DbConn dbc) {

        // sdl will be an empty array and DbError with ""
        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }

        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();

        try {
            String sql = "SELECT bike_id, bike_name, bike_image, bike_price, year_manufactured, "
                + "bike_brand, bike_model, bike_type, user_email, user_bike.web_user_id "
                + "FROM user_bike, web_user "
                + "WHERE user_bike.web_user_id = web_user.web_user_id "
                + "ORDER BY bike_name";  // always order by something, not just random order.

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {

                sd = new StringData();

                // the Format methods do not throw exceptions. If they find illegal data (like
                // you
                // tried to format a date as an integer), they return an error message (instead
                // of
                // returning the formatted value). So, you'll see these error messages right in
                // the
                // API output (JSON data) and/or you'll see it on the page in the UI.

                sd.bikeId = Format.fmtInteger(results.getObject("bike_id"));
                sd.bikeName = Format.fmtString(results.getObject("bike_name"));
                sd.bikeImage = Format.fmtString(results.getObject("bike_image"));
                sd.bikePrice = Format.fmtDollar(results.getObject("bike_price"));
                sd.yearManufactured = Format.fmtInteger(results.getObject("year_manufactured"));
                sd.bikeBrand = Format.fmtString(results.getObject("bike_brand"));
                sd.bikeModel = Format.fmtString(results.getObject("bike_model"));
                sd.bikeType = Format.fmtString(results.getObject("bike_type"));
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in WebUserView.getAllUsers(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
