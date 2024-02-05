package datahub.error;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Controller
public class ErrorController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/error{errorCode}.do")
    public String error(HttpServletRequest request, @PathVariable String errorCode, Model model) {
        String message = (String) request.getAttribute("javax.servlet.error.message");

        Map<String,Object> map = new HashMap<>();
        map.put("STATUS_CODE", request.getAttribute("javax.servlet.error.status_code"));
        map.put("REQUEST_URI", request.getAttribute("javax.servlet.error.request_uri"));
        map.put("EXCEPTION_TYPE", request.getAttribute("javax.servlet.error.exception_type"));
        map.put("EXCEPTION", request.getAttribute("javax.servlet.error.exception"));
        map.put("SERVLET_NAME", request.getAttribute("javax.servlet.error.servlet_name"));

        try {
            int statusCode = Integer.parseInt(errorCode);
            switch (statusCode) {
                case 404 : message = "페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다."; break;
                case 500 : message = "서버에 오류가 발생하였습니다. 관리자에게 문의 바랍니다."; break;
                default: message = "알 수 없는 오류가 발생하였습니다. 관리자에게 문의 바랍니다."; break;
            }
        } catch (Exception e) {
            message = "기타 오류가 발생하였습니다. 관리자에게 문의 바랍니다.";
        } finally {
            model.addAttribute("message",message);
            model.addAttribute("statusCode",request.getAttribute("javax.servlet.error.status_code"));
        }
        //logging
        if(map.isEmpty() == false ) {
            Iterator<Map.Entry<String,Object>> iterator = map.entrySet().iterator();
            Map.Entry<String,Object> entry = null;
            while(iterator.hasNext()) {
                entry = iterator.next();
                LOG.error("key : "+entry.getKey()+", value : "+entry.getValue());
            }
        }
        return "error";
    }
}
