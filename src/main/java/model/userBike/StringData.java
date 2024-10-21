package model.userBike;

public class StringData {
    public String bikeId = "";     // auto-increment primary key
    public String bikeName = "";   // varChar 45, must be unique
    public String bikeImage = "";
    public String bikePrice = "";
    public String yearManufactured = "";
    public String bikeBrand = "";
    public String bikeModel = "";
    public String bikeType = "";
    public String webUserId = "";  // int 11
    public String userEmail = "";     // varChar 45, must be unique

    public String errorMsg = "";      // not actually in the database, used by the app 
                                      // to convey success or failure.    
}
