package datahub.evChargerCurrent.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @ Class Name  : datahub.evChargerCurrent.dto
 * @ Description : GridDto
 * @ author      : joyuyeong
 * @ since       : 2024/01/16
 * @ 격자 데이터 조회용
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2024/01/16                        최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
@Data
@NoArgsConstructor
public class GridDto {

    private String code;        //격자 ID
    private String area;        //격자 좌표

}


