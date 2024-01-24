package datahub.evChargerDemand.web;

import datahub.common.DataTableDto;
import datahub.evChargerDemand.dto.EvChargerDemandDto;
import datahub.evChargerDemand.service.EvChargerDemandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class EvChargerDemandController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private EvChargerDemandService evChargerDemandService;

    /**
     * evChargerDemand 페이지
     * @method GET
     * @return evChargerDemand
     * */
    @RequestMapping(value="/evChargerDemand.do",method = RequestMethod.GET)
    public String evChargerDemand() {

        return "evChargerDemand";
    }

    @RequestMapping(value = "/getBuildings.json", method = RequestMethod.POST)
    @ResponseBody public DataTableDto getOverallPmLendRtnHstryList(HttpServletRequest request, EvChargerDemandDto evChargerDemandDto) {
        LOG.debug("getOverallPmLendRtnHstryList Controller starts!");

        Map<String, Object> result = new HashMap<>();

        evChargerDemandDto.setPagingYn(true);
        result.put("data", evChargerDemandService.getBuildings(evChargerDemandDto));

        List<EvChargerDemandDto> evChargerDemandDtoList = evChargerDemandService.getBuildings(evChargerDemandDto);
        int total = evChargerDemandService.countBuildings(evChargerDemandDto);

        return DataTableDto.builder()
                .data(evChargerDemandDtoList)
                .total(total)
                .build();
    }
}
