package datahub.evChargerCurrent.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @ Class Name  : datahub.evChargerCurrent.dto
 * @ Description : 충전기 검색조건 DTO
 * @ author      : joyuyeong
 * @ since       : 2024/02/21
 * @
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2024/02/21                        최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
@Data
@NoArgsConstructor
public class ChargerSearchDto {

    private String parameter;                   //주소, 충전기명 검색조건
}
