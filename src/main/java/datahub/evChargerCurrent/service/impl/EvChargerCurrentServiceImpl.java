package datahub.evChargerCurrent.service.impl;

import datahub.evChargerCurrent.dto.ChargerDto;
import datahub.evChargerCurrent.dto.ChargerSearchDto;
import datahub.evChargerCurrent.dto.GridDto;
import datahub.evChargerCurrent.mappers.pg.EvChargerCurrentMapper;
import datahub.evChargerCurrent.service.EvChargerCurrentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @ Class Name  : datahub.evChargerCurrent.service.impl
 * @ Description : EvChargerCurrentServiceImpl
 * @ author      : joyuyeong
 * @ since       : 2024/01/16
 * @
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2024/01/16                        최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
@Service
public class EvChargerCurrentServiceImpl implements EvChargerCurrentService {

    @Resource
    private EvChargerCurrentMapper evChargerCurrentMapper;

    @Override//격자 조회
    public List<GridDto> selectGrid() throws Exception {
        return evChargerCurrentMapper.selectGrid();
    }

    @Override//충전기 조회
    public List<ChargerDto> selectCharger(ChargerSearchDto chargerSearchDto) throws Exception {
        return evChargerCurrentMapper.selectCharger(chargerSearchDto);
    }
}
