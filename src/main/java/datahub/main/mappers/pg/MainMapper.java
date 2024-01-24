package datahub.main.mappers.pg;

import datahub.main.dto.BuildingDto;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import java.util.List;
import java.util.Map;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface MainMapper {

    EgovMap totalBuildingCount() throws Exception;

    EgovMap totalChargerCount() throws Exception;

    List<EgovMap> topEvChargerList() throws Exception;
}
