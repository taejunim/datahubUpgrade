package datahub.main.service.impl;

import datahub.main.dto.BuildingDto;
import datahub.main.mappers.pg.MainMapper;
import datahub.main.service.MainService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import java.util.Map;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MainServiceImpl implements MainService {

    @Resource
    private MainMapper mainMapper;

    @Override
    public EgovMap totalBuildingCount() throws Exception {
        return mainMapper.totalBuildingCount();
    }
}
