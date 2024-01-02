package datahub.user.mappers.pg;


import datahub.user.dto.UserDto;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface UserMapper {

    UserDto userLogin(UserDto userDto) throws Exception;

    int userJoin(UserDto userDto) throws Exception;
}