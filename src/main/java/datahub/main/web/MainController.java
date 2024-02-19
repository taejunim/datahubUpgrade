package datahub.main.web;

import datahub.main.service.MainService;
import datahub.user.dto.UserDto;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MainService mainService;

    /**
     * 메인 화면
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/main.do",method = RequestMethod.GET)
    public String main(ModelMap model) throws Exception {
        model.addAttribute("totalBuilding",mainService.totalBuildingCount());
        model.addAttribute("totalCharger",mainService.totalChargerCount());
        LOG.info("test {} ",mainService.countTest());
        return "main";
    }

    /**
     * 
     * @param userDto
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/topEvChargerList.json",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> topEvChargerList(UserDto userDto) throws Exception {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put("data", mainService.topEvChargerList());
            result.put("result", "success");

        } catch (IllegalArgumentException e){
            result.put("result", "fail");
            result.put("message", "처리 중 오류가 발생했습니다.");
        }

        return result;
    }

    /**
     * evChargerCurrent 페이지
     * @method GET
     * @return evChargerCurrent
     * */
    @RequestMapping(value="/evChargerCurrent.do",method = RequestMethod.GET)
    public String evChargerCurrent() {
        return "evChargerCurrent";
    }
}
