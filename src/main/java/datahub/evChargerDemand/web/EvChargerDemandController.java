package datahub.evChargerDemand.web;

import datahub.common.DataTableDto;
import datahub.evChargerDemand.dto.EvChargerDemandDto;
import datahub.evChargerDemand.service.EvChargerDemandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class EvChargerDemandController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private EvChargerDemandService evChargerDemandService;

    private final String startKey1 = "<sop:pnu>";
    private final  String endKey1   = "</sop:pnu>";
    private final String startKey3 = "<gml:LinearRing><gml:coordinates xmlns:gml=\"http://www.opengis.net/gml\" decimal=\".\" cs=\",\" ts=\" \">";
    private final String endKey3   = "</gml:coordinates></gml:LinearRing>";

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

        evChargerDemandDto.setPagingYn(true);

        List<EvChargerDemandDto> evChargerDemandDtoList = evChargerDemandService.getBuildings(evChargerDemandDto);
        int total = evChargerDemandService.countBuildings(evChargerDemandDto);

        return DataTableDto.builder()
                .data(evChargerDemandDtoList)
                .total(total)
                .build();
    }

    @RequestMapping(value = "/getCtnlgsSpceWFS.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getCtnlgsSpceWFS(@RequestBody EvChargerDemandDto evChargerDemandDto) {

        Map<String, Object> result = new HashMap<>();
        String fullUrl = "https://api.vworld.kr/ned/wfs/getCtnlgsSpceWFS?key=7E40F84D-DC6B-3185-AB2F-CCD55CEAB3FF&domain=localhost:8081&srsName=EPSG:3857&pnu="+evChargerDemandDto.getPnuCode();

        try {

            URL url = new URL(fullUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = rd.readLine()) != null) { sb.append(line); }
            rd.close();
            conn.disconnect();

            String apiResult = sb.toString();
            apiResult = apiResult.substring(apiResult.indexOf("<gml:featureMember>"));
            apiResult = apiResult.replaceAll("</wfs:FeatureCollection>","");

            String[] list = apiResult.split("</gml:featureMember>");

            List<Map<String, Object>> resultList = new ArrayList<>();

            for(int i = 0; i  < list.length; i ++) {
                Map<String, Object> object = new HashMap<>();

                if(list[i].contains(startKey1)) object.put("pnu", list[i].substring(list[i].indexOf(startKey1) + startKey1.length(), list[i].indexOf(endKey1)));
                else object.put("pnu", "-");
                if(list[i].contains(startKey3)) object.put("coordinates", list[i].substring(list[i].indexOf(startKey3) + startKey3.length(), list[i].indexOf(endKey3)));
                else object.put("coordinates", "-");
                resultList.add(object);
            }
            result.put("result", resultList);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}
