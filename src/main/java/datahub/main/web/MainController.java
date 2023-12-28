package datahub.main.web;

import datahub.main.user.dto.UserDto;
import datahub.main.user.service.UserService;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MainController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Inject
    private UserService userService;

    @RequestMapping(value="/")
    public String index() {
        return "index";
    }

    @RequestMapping(value="/login.do")
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/success.do")
    public String success() {
        return "success";
    }

    @RequestMapping(value="/main.do",method = RequestMethod.GET)
    public String main() {
        return "main";
    }

    @RequestMapping(value="/evChargerDemand.do",method = RequestMethod.GET)
    public String evChargerDemand() {
        return "evChargerDemand";
    }


    @RequestMapping(value = "/join.mng")
    @ResponseBody
    public void userJoin(@RequestBody UserDto userDto) throws Exception {
        userService.join(userDto);
    }


    @RequestMapping(value = "/join.do")
    public String join() {
        return "join";
    }

    @RequestMapping(value = "/userLogin.mng", method = RequestMethod.POST)
    @ResponseBody
    public String userLogin(@RequestBody UserDto userDto) throws Exception {
        String message = "";

        message = userService.userLogin(userDto);

        LOG.info("result : " + message);

        return message;
    }
}
