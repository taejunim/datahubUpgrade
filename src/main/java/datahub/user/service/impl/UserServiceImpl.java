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

        if (result == null || !encoder.matches(userDto.getUserPwd(), result.getUserPwd())) {    // 사용자가 입력한 비밀번호를 인코딩 후 디비의 비밀번호와 매칭 시킨다.
            return null;
        }

        return result;
    }

    @Override
    public void join(UserDto userDto) throws Exception {

        userDto.setUserPwd(encoder.encode(userDto.getUserPwd()));                               // 비밀번호를 인코딩한 뒤 insert
        userMapper.userJoin(userDto);
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

    @Override
    public void updateUser(UserDto userDto) throws Exception {
        if (!userDto.getUserPwd().isEmpty()) {
            userDto.setUserPwd(encoder.encode(userDto.getUserPwd()));
        }
        userMapper.updateUser(userDto);
    }

    @Override
    public void deleteUser(UserDto userDto) throws Exception {
        userMapper.deleteUser(userDto);
    }
}
