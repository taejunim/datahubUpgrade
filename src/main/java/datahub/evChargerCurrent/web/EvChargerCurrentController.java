package datahub.evChargerCurrent.web;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import datahub.evChargerCurrent.dto.ChargerDto;
import datahub.evChargerCurrent.dto.ChargerSearchDto;
import datahub.evChargerCurrent.service.EvChargerCurrentService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
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

    private final String startKeyStatId      = "statId";
    private final String startKeyChgerId     = "chgerId";
    private final String startKeyStat        = "stat";

    @RequestMapping(value = "/selectGrid.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectGrid(ChargerSearchDto chargerSearchDto) throws Exception {

        Map<String, Object> result = new HashMap<>();
        result.put("result", evChargerCurrentService.selectGrid());

        try {
            result.put("allChargerList", evChargerCurrentService.selectCharger(chargerSearchDto));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    //충전기 조회 (검색조건을 통한 리스트 조회)
    @RequestMapping(value = "/selectCharger.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectCharger(@RequestBody ChargerSearchDto chargerSearchDto) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put("result", evChargerCurrentService.selectCharger(chargerSearchDto));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    //충전기 조회 (검색조건을 통한 리스트 조회)
    @RequestMapping(value = "/searchEvChargerStatus.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> searchEvChargerStatus(@RequestBody String parameter) {
        Map<String, Object> result = new HashMap<>();
        String fullUrl = "https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=4RGqCY56UThQj9rWI5bSDJgJpaY%2FyzwiG80iyAxo1qwn7xLn5EsHJiMr3544zZdC%2Fpumr7Wn9oJAC2q12fi0ZQ%3D%3D&pageNo=1&numOfRows=9999&zscode=" + parameter;

        try {
            result.put("result", getChargerStatus(fullUrl));

        } catch (SocketTimeoutException e) {
            e.printStackTrace();
            result.put("message", "충전소 상태 조회에 실패했습니다. (API 응답 시간 초과)");
        } catch (ClassCastException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    public List<ChargerDto> getChargerStatus(String fullUrl) throws IOException {

        URL url = new URL(fullUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setConnectTimeout(3000);
        conn.setReadTimeout(8000);

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
        List<ChargerDto> resultList = new ArrayList<>();
        JSONObject jsonObject = XML.toJSONObject(apiResult);
        jsonObject = (JSONObject) jsonObject.get("response");
        jsonObject = (JSONObject) jsonObject.get("body");
        jsonObject = (JSONObject) jsonObject.get("items");

        JSONArray jsonArray = (JSONArray) jsonObject.get("item");

        for(int i = 0; i < jsonArray.length(); i ++) {
            JSONObject object = (JSONObject) jsonArray.get(i);
            ChargerDto chargerDto = new ChargerDto();

            chargerDto.setStationId(object.get(startKeyStatId).toString());
            chargerDto.setChargerId(object.get(startKeyChgerId).toString());

            String status = object.get(startKeyStat).toString();
            chargerDto.setStatus(status);
            chargerDto.setStatusName(getChargerStatusName(status));

            resultList.add(chargerDto);
        }

        return resultList;
    }

    public String getChargerStatusName(String code) {

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
