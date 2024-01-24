package datahub.common;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class DataTableDto {

    private List<? extends Object> data;
    private int recordsTotal;
    private int recordsFiltered;

    @Builder
    public DataTableDto(List<? extends Object> data, int total) {
        this.data = data;
        this.recordsTotal = total;
        this.recordsFiltered = total;
    }

}
