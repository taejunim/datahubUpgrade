package datahub.evChargerCurrent.service;

import datahub.evChargerCurrent.dto.GridDto;

import java.util.List;

/**
 * @ Class Name  : datahub.evChargerCurrent.service
 * @ Description : EvChargerCurrentService
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
public interface EvChargerCurrentService {

    //격자 조회
    List<GridDto> selectGrid() throws Exception;
}
