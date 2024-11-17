package com.peachey_web_hw_6;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpSession; 

import model.webUser.*;
import dbUtils.*;
import view.WebUserView;

@RestController
public class WebUserController {

    @RequestMapping(value = "/webUser/getAll", produces = "application/json")
    public String allUsers() {
        StringDataList list = new StringDataList();
        DbConn dbc = new DbConn();
        list = WebUserView.getAllUsers(dbc);
        dbc.close();
        return Json.toJson(list);
    }

    @RequestMapping(value = "/webUser/login", produces = "application/json")
    public String login(
            @RequestParam(name = "email", required = true) String email,
            @RequestParam(name = "pass", required = true) String pass,
            HttpSession session) {

        StringData sd = new StringData();
        DbConn dbc = new DbConn();
        
        // Debug logging
        System.out.println("Login attempt - Email: " + email);
        
        sd = DbMods.getUser(dbc, email, pass);
        
        if (sd.errorMsg.length() == 0) {  // no error means successful login
            session.setAttribute("loggedOnUser", sd);
            System.out.println("Login successful - User stored in session");
        } else {
            System.out.println("Login failed - Error: " + sd.errorMsg);
        }
        
        dbc.close(); 
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/webUser/getProfile", produces = "application/json")
    public String getProfile(HttpSession session) {
        StringData sd = new StringData();
        
        if (session.getAttribute("loggedOnUser") != null) {
            sd = (StringData) session.getAttribute("loggedOnUser");
        } else {
            sd.errorMsg = "No user logged on";
        }
        
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/webUser/logoff", produces = "application/json")
    public String logoff(HttpSession session) {
        StringData sd = new StringData();
        session.invalidate();
        sd.errorMsg = "User is now logged off";
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/webUser/insert", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No user data was provided in JSON format";
        } else {
            System.out.println("user data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("user data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // db connection OK
                    errorMsgs = DbMods.insert(insertData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.webUser.StringData obj: "+
                jsonInsertData+ " - or other error in controller for 'user/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }
}
