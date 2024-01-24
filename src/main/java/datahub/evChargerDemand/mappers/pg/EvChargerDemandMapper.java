package datahub.evChargerDemand.mappers.pg;

import datahub.evChargerDemand.dto.EvChargerDemandDto;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;

@MapperScan
public interface EvChargerDemandMapper {
    List<EvChargerDemandDto> selectBuildings(EvChargerDemandDto evChargerDemandDto);

    int countBuildings(EvChargerDemandDto evChargerDemandDto);
}
