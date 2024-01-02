package datahub.main.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BuildingDto {

    private String totalBuilding;
    private String normalBuilding;
    private String abnormalBuilding;
}
