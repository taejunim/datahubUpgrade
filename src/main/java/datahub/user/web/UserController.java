package datahub.user.web;

import datahub.common.SessionConst;
import datahub.user.dto.UserDto;
import datahub.user.service.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {

    @Inject
    private UserService userService;

    @RequestMapping(value="/login.do")
    public String login(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object save = session.getAttribute(SessionConst.SAVE_ID);

        if (save != null) {
            return "redirect:/main.do";
        }

        return "login";
    }

    /**
     * 회원 가입 화면
     * @return
     */
    @RequestMapping(value="/join.do")
    public String join() {

        return "join";
    }

    /**
     * 사용자 등록
     * @param userDto
     * @throws Exception
     */
    @RequestMapping(value = "/join.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> userJoin(@RequestBody UserDto userDto) throws Exception {
        Map<String ,Object> result = new HashMap<String ,Object>();
        try {

            userService.join(userDto);

            result.put("result", "success");

        } catch (Exception e) {
            result.put("result", "fail");
        }

        return result;

    }


    /**
     * 사용자 정보 조회 -- userId
     * @param userDto
     * @return
     */
    @RequestMapping(value ="/selectUser.json", method = RequestMethod.POST)
    @ResponseBody
    public UserDto selectUser(@RequestBody UserDto userDto) throws Exception {

        return userService.selectUser(userDto);
    }

    @RequestMapping(value = "/userLogin.mng", method = RequestMethod.POST)
    public @ResponseBody String userLogin(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {

        UserDto user = userService.userLogin(userDto);
        if(user == null) {
            return "EMPTY USER";
        }
        HttpSession session = request.getSession();

        session.setAttribute(SessionConst.LOGIN_MEMBER, user.getUserId());                                   // 로그인에 성공하면 세션에 내용을 저장한다.
        session.setMaxInactiveInterval(3600);                                                                // 세션 시간을 설정한다.

        if (userDto.getSaveId().equals("Y")) {
            session.setAttribute(SessionConst.SAVE_ID, user.getUserId());
            session.setMaxInactiveInterval(3600);
        }
        return user.getUserId();
    }

    @RequestMapping(value = "/logout.mng", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        request.getSession(true);
        return "redirect:/login.do";
    }
}
