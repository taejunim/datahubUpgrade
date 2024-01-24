package datahub.evChargerDemand.service.impl;

import datahub.evChargerDemand.dto.EvChargerDemandDto;
import datahub.evChargerDemand.mappers.pg.EvChargerDemandMapper;
import datahub.evChargerDemand.service.EvChargerDemandService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class EvChargerDemandServiceImpl implements EvChargerDemandService {
    @Resource
    private EvChargerDemandMapper evChargerDemandMapper;

    @Override
    public List<EvChargerDemandDto> getBuildings(EvChargerDemandDto evChargerDemandDto) {

        return evChargerDemandMapper.selectBuildings(evChargerDemandDto);
    }

    @Override
    public int countBuildings(EvChargerDemandDto evChargerDemandDto) {
        return evChargerDemandMapper.countBuildings(evChargerDemandDto);
    }
}
