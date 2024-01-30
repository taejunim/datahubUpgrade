package datahub.evChargerCurrent.web;

import datahub.evChargerCurrent.service.EvChargerCurrentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class EvChargerCurrentController {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private EvChargerCurrentService evChargerCurrentService;

    private final String startKeyLng         = "<lng>";
    private final String endKeyLng           = "</lng>";

    private final String startKeyLat         = "<lat>";
    private final String endKeyLat           = "</lat>";

    private final String startKeyStatNm      = "<statNm>";
    private final String endKeyStatNm        = "</statNm>";

    private final String startKeyStat        = "<stat>";
    private final String endKeyStat          = "</stat>";

    private final String startKeyAddr        = "<addr>";
    private final String endKeyAddr          = "</addr>";

    @RequestMapping(value = "/selectGrid.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectGrid() throws Exception {

        Map<String, Object> result = new HashMap<>();
        result.put("result", evChargerCurrentService.selectGrid());

        String fullUrl = "https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=4RGqCY56UThQj9rWI5bSDJgJpaY%2FyzwiG80iyAxo1qwn7xLn5EsHJiMr3544zZdC%2Fpumr7Wn9oJAC2q12fi0ZQ%3D%3D&pageNo=1&numOfRows=8000&zcode=50";

        try {
            result.put("allChargerList", getChargers(fullUrl, ""));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    //충전기 조회 (검색조건을 통한 리스트 조회)
    @RequestMapping(value = "/searchEvChargers.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> searchEvChargers(String parameter) {

        Map<String, Object> result = new HashMap<>();
        String fullUrl = "https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=4RGqCY56UThQj9rWI5bSDJgJpaY%2FyzwiG80iyAxo1qwn7xLn5EsHJiMr3544zZdC%2Fpumr7Wn9oJAC2q12fi0ZQ%3D%3D&pageNo=1&numOfRows=100&zcode=50";

        try {
            result.put("result", getChargers(fullUrl, parameter));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    public List<Map<String, Object>> getChargers(String fullUrl, String parameter) throws IOException {
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
        apiResult = apiResult.substring(apiResult.indexOf("<item>"));
        apiResult = apiResult.replaceAll("</items></body></response>","");

        String[] list = apiResult.split("</item>");

        List<Map<String, Object>> resultList = new ArrayList<>();

        for(int i = 0; i  < list.length; i ++) {
            Map<String, Object> object = new HashMap<>();

            if(list[i].contains(startKeyLng) && list[i].contains(startKeyLat))
                object.put("location", list[i].substring(list[i].indexOf(startKeyLng) + startKeyLng.length(), list[i].indexOf(endKeyLng))
                        + "," + list[i].substring(list[i].indexOf(startKeyLat) + startKeyLat.length(), list[i].indexOf(endKeyLat)));

            if(list[i].contains(startKeyStatNm)) object.put("detail", list[i].substring(list[i].indexOf(startKeyStatNm) + startKeyStatNm.length(), list[i].indexOf(endKeyStatNm)));
            else object.put("detail", "-");

            if(list[i].contains(startKeyStat)) {
                String status = list[i].substring(list[i].indexOf(startKeyStat) + startKeyStat.length(), list[i].indexOf(endKeyStat));
                object.put("statusName", getChargerStatus(status));
                if(getChargerStatus(status).equals("알수없음"))  object.put("status", "1");
                else object.put("status", status);
            } else {
                object.put("status", "1");
                object.put("statusName", "-");
            }

            if(list[i].contains(startKeyAddr)) object.put("address", list[i].substring(list[i].indexOf(startKeyAddr) + startKeyAddr.length(), list[i].indexOf(endKeyAddr)));
            else object.put("address\"", "-");

            resultList.add(object);
        }

        return resultList;
    }

    public String getChargerStatus(String code) {

        String codeName = "알수없음";

        switch (code) {
            case "0" : break;
            case "1" : codeName = "통신이상";
                       break;
            case "2" : codeName = "사용가능";
                       break;
            case "3" : codeName = "충전중";
                       break;
            case "4" : codeName = "운영중지";
                       break;
            case "5" : codeName = "점검중";
                       break;
        }

        return codeName;
    }
}
