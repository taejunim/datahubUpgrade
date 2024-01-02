package datahub.main.service;

import datahub.main.dto.BuildingDto;

public interface MainService {
    BuildingDto mainBuildingInfo() throws Exception;
}
