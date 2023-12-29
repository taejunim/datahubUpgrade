package datahub.main.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String userId;                  // 사용자 아이디
    private String userPwd;                 // 사용자 비밀번호
    private String userName;                // 사용자 이름
    private String userBirth;               // 사용자 생년월일
    private String userPhone;               // 사용자 전화번호
    private String userType;                // 사용자 타입 '001' 관리자 , '002' 일반 사용자
    private String regDt;                   // 사용자 가입 날짜

    private String saveID;                  // 자동로그인 여부
}
