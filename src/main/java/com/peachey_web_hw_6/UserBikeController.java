package com.peachey_web_hw_6;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}