package datahub.evChargerCurrent.mappers.pg;

import datahub.evChargerCurrent.dto.ChargerDto;
import datahub.evChargerCurrent.dto.ChargerSearchDto;
import datahub.evChargerCurrent.dto.GridDto;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;

/**
 * @ Class Name  : datahub.evChargerCurrent.mappers.pg
 * @ Description : EvChargerCurrentMapper
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
@MapperScan
public interface EvChargerCurrentMapper {

    //격자 조회
    List<GridDto> selectGrid() throws Exception;

    //충전기 조회
    List<ChargerDto> selectCharger(ChargerSearchDto chargerSearchDto) throws Exception;
}
