package datahub.user.service;


import datahub.user.dto.UserDto;

public interface UserService {

    UserDto userLogin(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;
}
