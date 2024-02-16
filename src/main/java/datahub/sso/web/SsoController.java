package datahub.sso.web;

import datahub.common.SessionConst;
import datahub.user.dto.UserDto;
import datahub.user.service.UserService;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SsoController {

    @Inject
    private UserService userService;

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value="/ssoMain.do")
    public String ssoMain(HttpServletRequest request, UserDto userDto) throws Exception {

        return "ssoMain";
    }
}
