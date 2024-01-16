package datahub.evChargerDemand.web;

import datahub.main.service.MainService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class EvChargerDemandController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    /**
     * evChargerDemand 페이지
     * @method GET
     * @return evChargerDemand
     * */
    @RequestMapping(value="/evChargerDemand.do",method = RequestMethod.GET)
    public String evChargerDemand() {

        return "evChargerDemand";
    }
}
