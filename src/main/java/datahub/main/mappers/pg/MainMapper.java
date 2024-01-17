package datahub.main.mappers.pg;

import datahub.main.dto.BuildingDto;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import java.util.Map;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface MainMapper {

    EgovMap totalBuildingCount() throws Exception;
}
