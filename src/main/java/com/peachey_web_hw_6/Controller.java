package com.peachey_web_hw_6;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @RequestMapping("/hello")
    public String helloController() {
        return "<h1>Hello World</h2>";
    }
}