package datahub.main.service.impl;

import datahub.main.mappers.pg1.PostgrelTestMapper;
import datahub.main.mappers.pg.MainMapper;
import datahub.main.service.MainService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import java.util.List;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MainServiceImpl implements MainService {

    @Resource
    private MainMapper mainMapper;

    @Resource
    private PostgrelTestMapper postgrelTestMapper;

    @Override
    public EgovMap totalBuildingCount() throws Exception {
        return mainMapper.totalBuildingCount();
    }

    @Override
    public EgovMap totalChargerCount() throws Exception {
        return mainMapper.totalChargerCount();
    }

    @Override
    public List<EgovMap> topEvChargerList() throws Exception {
        return mainMapper.topEvChargerList();
    }

    @Override
    public int countTest() throws Exception {
        return postgrelTestMapper.countTest();
    }


}
