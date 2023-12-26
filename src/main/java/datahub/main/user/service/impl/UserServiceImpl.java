package datahub.main.user.service.impl;

import datahub.main.user.dto.UserDto;
import datahub.main.user.mappers.postgres.UserMapper;
import datahub.main.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public String userLogin(UserDto userDto) throws Exception {
        Optional<UserDto> result = Optional.ofNullable(userMapper.userLogin(userDto));
        if (!result.isPresent()) {
            return "NOT FOUND USER";
        }
        if(!encoder.matches(userDto.getUserPwd(), result.get().getUserPwd())) {
            return "NOT MATCHES PASSWORD";
        }
        return "SUCCESS";
    }

    @Override
    public void join(UserDto userDto) throws Exception {

        userDto.setUserPwd(encoder.encode(userDto.getUserPwd()));
        int result = userMapper.userJoin(userDto);
    }
}
