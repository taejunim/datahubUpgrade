package datahub.evChargerDemand.dto;

import datahub.common.DtoBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class EvChargerDemandDto extends DtoBase {

    private String buildingId;
    private String buildingName;
    private String buildingPurposeCode;
    private String region;
    private String buildingType;
    private String roadNameAddress;
    private String landLotNumberAddress;
    private String permissionDate;
    private String completionDate;
    private String floors;
    private String buildingArea;
    private String totalArea;
    private String platArea;
    private String selfOutdoorParkingCount;
    private String selfIndoorParkingCount;
    private String mechanicalOutdoorParkingCount;
    private String mechanicalIndoorParkingCount;
    private String pnuCode;
    private String suitability;

    private String searchRegion;
    private String permissionDateFrom;
    private String permissionDateTo;
}
