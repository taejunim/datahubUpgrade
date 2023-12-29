package datahub.main.user.service.impl;

import datahub.main.user.dto.UserDto;
import datahub.main.user.mappers.pg.UserMapper;
import datahub.main.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public UserDto userLogin(UserDto userDto) throws Exception {
        UserDto result = userMapper.userLogin(userDto);
        if (result == null) {
            return null;
        }
        if (!encoder.matches(userDto.getUserPwd(), result.getUserPwd())) {
            return null;
        }

        return result;
    }

    @Override
    public void join(UserDto userDto) throws Exception {

        userDto.setUserPwd(encoder.encode(userDto.getUserPwd()));
        int result = userMapper.userJoin(userDto);
    }
}
