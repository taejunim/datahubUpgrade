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
        session.setAttribute(SessionConst.LOGIN_MEMBER,"WAIT");                             // 로그인 화면 진입 시 대기상태를 세션에 저장한다.

        return "login";
    }

    @RequestMapping(value="/main.do",method = RequestMethod.GET)
    public String main(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER,"FINISH");                           // 로그인 후 메인화면 집입 시 완료상태를 세션의 저장한다.
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

        if(bindingResult.hasErrors()) {                                                             // 로그인 실패시 세션에 Null을 저장한다.
            message = "NOT FOUND USER";
            session.setAttribute(SessionConst.LOGIN_MEMBER, null);
            return message;
        }

        if (message.equals("NOT FOUND USER") || message.equals("NOT MATCHES PASSWORD")) {           // 로그인 실패시 세션에 Null을 저장한다.
            bindingResult.reject("loginFail","아이디 또는 비밀번호가 맞지 않습니다.");
            session.setAttribute(SessionConst.LOGIN_MEMBER, null);
            return message;
        }

        session.setAttribute(SessionConst.LOGIN_MEMBER, message);                                   // 로그인에 성공하면 세션에 내용을 저장한다.
        session.setMaxInactiveInterval(3600);                                                       // 세션 시간을 설정한다.

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
