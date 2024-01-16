package datahub.main.web;

import datahub.main.service.MainService;
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

    @RequestMapping(value="/main.do",method = RequestMethod.GET)
    public String main(ModelMap model) throws Exception {
        model.addAttribute("buildingInfo",mainService.mainBuildingInfo());
        return "main";
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
