package datahub.main.mappers.pg1;

import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface PostgrelTestMapper {

    public int countTest() throws Exception;
}
