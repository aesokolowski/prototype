package com.sokoportfolio.prototype;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewsController {
    @RequestMapping(value = "/distortomata")
    public String distortomata() {
        return "distortomata";
    }

    @RequestMapping(value = "/tictactoe")
    public String tictactoe() {
        return "tictactoe";
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}