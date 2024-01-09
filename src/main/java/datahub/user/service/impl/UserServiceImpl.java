package datahub.user.service.impl;

import datahub.user.dto.UserDto;
import datahub.user.mappers.pg.UserMapper;
import datahub.user.service.UserService;
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

        if (result == null || !encoder.matches(userDto.getUserPwd(), result.getUserPwd())) {
            return null;
        }

        return result;
    }

    @Override
    public void join(UserDto userDto) throws Exception {

        userDto.setUserPwd(encoder.encode(userDto.getUserPwd()));
        int result = userMapper.userJoin(userDto);
    }

    /**
     * 사용자 정보 조회 -- userId
     * @param userDto
     * @return
     */
    @Override
    public UserDto selectUser(UserDto userDto) throws Exception {

        userDto = userMapper.userLogin(userDto);

        return userDto;
    }
}
