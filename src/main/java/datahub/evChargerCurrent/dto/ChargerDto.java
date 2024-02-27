package datahub.evChargerCurrent.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @ Class Name  : datahub.evChargerCurrent.dto
 * @ Description : ChargerDto
 * @ author      : joyuyeong
 * @ since       : 2024/02/13
 * @
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2024/02/13                        최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
@Data
@NoArgsConstructor
public class ChargerDto {
    private String stationId;
    private String chargerId;
    private String detail;
    private String location;
    private String address;
    private String status;
    private String statusName;
    private String output;
    private String businessId;
    private String businessName;
    private String businessCall;
}
