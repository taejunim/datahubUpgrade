package datahub.user.service;


import datahub.user.dto.UserDto;
import java.util.List;

public interface UserService {

    UserDto userLogin(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;

    UserDto selectUser(UserDto userDto) throws Exception;

}
