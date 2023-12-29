package datahub.main.user.mappers.pg;


import datahub.main.user.dto.UserDto;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface UserMapper {

    UserDto userLogin(UserDto userDto) throws Exception;

    int userJoin(UserDto userDto) throws Exception;
}
