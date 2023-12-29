package datahub.main.user.service;


import datahub.main.user.dto.UserDto;

public interface UserService {

    UserDto userLogin(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;
}
