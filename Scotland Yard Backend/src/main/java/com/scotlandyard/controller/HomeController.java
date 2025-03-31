package com.scotlandyard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {

    @GetMapping("/isWorking")
    public String checkIfWorking(){
        System.out.println("isWorking");
        return "working";
    }

}
