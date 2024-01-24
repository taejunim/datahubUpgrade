package datahub.evChargerDemand.service;

import datahub.evChargerDemand.dto.EvChargerDemandDto;

import java.util.List;

public interface EvChargerDemandService {

    List<EvChargerDemandDto> getBuildings(EvChargerDemandDto evChargerDemandDto);

    int countBuildings(EvChargerDemandDto evChargerDemandDto);
}
