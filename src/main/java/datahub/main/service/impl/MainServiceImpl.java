package datahub.main.service.impl;

import datahub.main.dto.BuildingDto;
import datahub.main.mappers.my.MainMapper;
import datahub.main.service.MainService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MainServiceImpl implements MainService {

    @Resource
    private MainMapper mainMapper;

    @Override
    public BuildingDto mainBuildingInfo() throws Exception {
        return mainMapper.mainBuildingInfo();
    }
}
