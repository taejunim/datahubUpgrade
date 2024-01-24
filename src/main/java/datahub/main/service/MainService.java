package datahub.main.service;

import datahub.main.dto.BuildingDto;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import java.util.List;
import java.util.Map;

public interface MainService {

    EgovMap totalBuildingCount() throws Exception;

    EgovMap totalChargerCount() throws Exception;

    List<EgovMap> topEvChargerList() throws Exception;
}
