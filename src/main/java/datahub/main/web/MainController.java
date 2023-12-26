package datahub.main.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {


    @RequestMapping(value="/login.do",method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value="/main.do",method = RequestMethod.GET)
    public String main() {
        return "main";
    }
}
