package datahub.main.web;

import datahub.main.common.SessionConst;
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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public String login(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER,"WAIT");

        return "login";
    }

    @RequestMapping(value="/main.do",method = RequestMethod.GET)
    public String main(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER,"FINISH");
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
    public String userLogin(@RequestBody UserDto userDto, BindingResult bindingResult, HttpServletRequest request) throws Exception {
        String message = "";

        message = userService.userLogin(userDto);
        HttpSession session = request.getSession();

        if(bindingResult.hasErrors()) {
            message = "NOT FOUND USER";
            session.setAttribute(SessionConst.LOGIN_MEMBER, null);
            return message;
        }

        if (message.equals("NOT FOUND USER") || message.equals("NOT MATCHES PASSWORD")) {
            bindingResult.reject("loginFail","아이디 또는 비밀번호가 맞지 않습니다.");
            session.setAttribute(SessionConst.LOGIN_MEMBER, null);
            return message;
        }

        session.setAttribute(SessionConst.LOGIN_MEMBER, message);

        LOG.info("result : " + message);

        return message;
    }

    @RequestMapping(value = "/logout.mng", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        request.getSession(true);
        return "redirect:/login.do";
    }
}
