package datahub.main.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BuildingDto {

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
}
