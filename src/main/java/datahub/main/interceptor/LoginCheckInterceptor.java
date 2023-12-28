package datahub.main.interceptor;

import datahub.main.common.SessionConst;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginCheckInterceptor extends HandlerInterceptorAdapter {

    private static final Logger logger = LoggerFactory.getLogger(LoginCheckInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession();
        Object result = session.getAttribute(SessionConst.LOGIN_MEMBER);        // 컨트롤러 가기 전 인터셉트를 거쳐서 세션을 확인한다.

        logger.info("session : {} ", result);

        if (result == null) {
            logger.info("current user is not logined");

            response.sendRedirect("/");
        } else if (result.equals("SUCCESS")){
            logger.info("current user is login");

            response.sendRedirect("/main.do");
        }

        System.out.println("pre Handler...!");
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("post Handler...!");

        super.postHandle(request, response, handler, modelAndView);
    }
}
