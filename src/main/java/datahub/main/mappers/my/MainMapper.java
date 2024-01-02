package datahub.main.mappers.my;

import datahub.main.dto.BuildingDto;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface MainMapper {

    BuildingDto mainBuildingInfo() throws Exception;
}
