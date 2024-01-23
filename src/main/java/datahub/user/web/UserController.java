package datahub.user.web;

import datahub.common.SessionConst;
import datahub.user.dto.UserDto;
import datahub.user.service.UserService;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {

    @Inject
    private UserService userService;
    /**
     * 로그인 페이지
     * @method GET
     * @param request
     * @return login.jsp
     * */
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
        Map<String ,Object> result = new HashMap<>();
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
    /**
     * 로그인 비동기 처리
     * @method POST
     * @param userDto
     * @param request
     * @return user.getUserId()
     * */
    @RequestMapping(value = "/userLogin.mng", method = RequestMethod.POST)
    public @ResponseBody String userLogin(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {

        UserDto user = userService.userLogin(userDto);
        if(user == null) {
            return "EMPTY USER";
        }
        HttpSession session = request.getSession();

        session.setAttribute(SessionConst.LOGIN_MEMBER, user);                                   // 로그인에 성공하면 세션에 내용을 저장한다.
        session.setMaxInactiveInterval(3600);                                                                // 세션 시간을 설정한다.

        if (userDto.getSaveId().equals("Y")) {
            session.setAttribute(SessionConst.SAVE_ID, user);
            session.setMaxInactiveInterval(3600);
        }
        return user.getUserId();
    }
    /**
     * 로그아웃
     * @method GET
     * @param request
     * @return user.getUserId()
     * */
    @RequestMapping(value = "/logout.mng", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        request.getSession(true);
        return "redirect:/login.do";
    }

    @RequestMapping(value = "/myPage.do" , method = RequestMethod.GET)
    public String myPage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        UserDto result = (UserDto) session.getAttribute(SessionConst.LOGIN_MEMBER);

        System.out.println("result : " + result);

        model.addAttribute("myPage",result);

        return "myPage";
    }
    @RequestMapping(value = "/updateUser.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateUser (@RequestBody Map<String,Object> userDto,HttpServletRequest request) {
        Map<String ,Object> result = new HashMap<>();
        UserDto user = new UserDto();
        user.setUserId((String) userDto.get("userId"));
        user.setUserPwd((String) userDto.get("userPwdNow"));
        System.out.println("userGetId : " + (String) userDto.get("userId"));
        System.out.println("userGetId : " + (String) userDto.get("userPwdNow"));                            // 현재 비밀번호 검증

        try {

            UserDto userResult = userService.userLogin(user);
            if (Objects.isNull(userResult)) {
                result.put("message","not found");
                return result;
            }
            userResult.setUserPwd(String.valueOf(userDto.get("userPwd")));                                  // 비밀번호 변경
            userResult.setUserName(String.valueOf(userDto.get("userName")));                                // 이름 변경
            userResult.setUserPhone(String.valueOf(userDto.get("userPhone")));                              // 휴대폰 번호 변경
            System.out.println("userResult : " + userResult);
            userService.updateUser(userResult);
            HttpSession session = request.getSession();
            session.setAttribute(SessionConst.LOGIN_MEMBER,userResult);
            result.put("message","success");
        } catch (Exception e) {
            result.put("message","fail");
        }
        return result;
    }
}
