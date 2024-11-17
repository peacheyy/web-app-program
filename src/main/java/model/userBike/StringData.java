package model.userBike;

public class StringData {
    public String bikeId = "";        // auto-increment primary key
    public String bikeName = "";      // varChar 45, must be unique
    public String bikeImage = "";     // varChar 500, required (length >=1)
    public String bikePrice = "";     // type decimal, optional
    public String yearManufactured = ""; // type year, optional
    public String bikeBrand = "";     // varChar 45, required (length >=1)
    public String bikeModel = "";     // varChar 45, required (length >=1)
    public String bikeType = "";      // varChar 45, required (length >=1)
    public String webUserId = "";     // foreign key (integer), required by DB
    public String userEmail = "";     // varChar 45, must be unique

    public String errorMsg = "";      // not actually in the database, used by the app 
                                     // to convey success or failure.    

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    public int characterCount() {
        String s = this.bikeId + this.bikeName + this.bikeImage +
                this.bikePrice + this.yearManufactured + this.bikeBrand +
                this.bikeModel + this.bikeType + this.webUserId + this.userEmail;
        return s.length();
    }

    // not required, can be useful for debugging, e.g.,
    // System.println(sdObj.toString());
    public String toString() {
        return "Bike Id: " + this.bikeId
                + ", Bike Name: " + this.bikeName
                + ", Bike Image: " + this.bikeImage
                + ", Bike Price: " + this.bikePrice
                + ", Year Manufactured: " + this.yearManufactured
                + ", Bike Brand: " + this.bikeBrand
                + ", Bike Model: " + this.bikeModel
                + ", Bike Type: " + this.bikeType
                + ", Web User Id: " + this.webUserId
                + ", User Email: " + this.userEmail;
    }
}