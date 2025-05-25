package com.peachey_web_hw_6;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.userBike.*;
import dbUtils.*;
import view.UserBikeView;

@RestController
public class UserBikeController {

    @RequestMapping(value = "/userBike/getAll", produces = "application/json")
    public String allUsers() {

        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = UserBikeView.getAllUsers(dbc);

        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).

        return Json.toJson(list); // convert sdl obj to JSON Format and return that.
    }

    @RequestMapping(value = "/userBike/insert", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No bike data was provided in JSON format";
        } else {
            System.out.println("bike data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("bike data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // db connection OK
                    errorMsgs = DbMods.insert(insertData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.userBike.StringData obj: " +
                jsonInsertData + " - or other error in controller for 'userBike/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }

    @RequestMapping(value = "/userBike/getById", params = {"bikeId"}, produces = "application/json")
    public String getById(@RequestParam("bikeId") String bikeId) {
        StringData sd = new StringData();
        if (bikeId == null) {
            sd.errorMsg = "Error: URL must be userBike/getById?bikeId=xx " +
                    "where xx is the bike_id of the desired bike record.";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr();
            if (sd.errorMsg.length() == 0) {
                System.out.println("*** Ready to call DbMods.getById");
                sd = DbMods.getById(dbc, bikeId);
            }
            dbc.close();
        }
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/userBike/update", params = {"jsonData"}, produces = "application/json")
    public String update(@RequestParam("jsonData") String jsonUpdateData) {
        StringData errorData = new StringData();

        if ((jsonUpdateData == null) || jsonUpdateData.length() == 0) {
            errorData.errorMsg = "Cannot update. No bike data was provided in JSON format";
        } else {
            System.out.println("bike data for update (JSON): " + jsonUpdateData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData updateData = mapper.readValue(jsonUpdateData, StringData.class);
                System.out.println("bike data for update (java obj): " + updateData.toString());

                DbConn dbc = new DbConn();
                errorData = DbMods.update(updateData, dbc);
                dbc.close();
            } catch (Exception e) {
                String msg = "Unexpected error in controller for 'bike/update'... " +
                        e.getMessage();
                System.out.println(msg);
                errorData.errorMsg = msg;
            }
        }
        return Json.toJson(errorData);
    }

    @RequestMapping(value = "/userBike/delete", params = {"bikeId"}, produces = "application/json")
    public String deleteBike(@RequestParam("bikeId") String bikeId) {
        StringData sd = new StringData();
        if (bikeId == null) {
            sd.errorMsg = "Error: URL must be userBike/delete?bikeId=xx, where " +
                    "xx is the bike_id of the bike record to be deleted.";
        } else {
            DbConn dbc = new DbConn();
            sd = DbMods.delete(dbc, bikeId);
            dbc.close();
        }
        return Json.toJson(sd);
    }

}