<%--
  Created by IntelliJ IDEA.
  User: kim-useong
  Date: 2023/12/24
  Time: 12:06 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>
<script type="text/javascript" src="/js/views/join.js"></script>

<html>
<head>
    <title>회원가입 임시</title>
</head>
<body>
    <form action="/join" method="post">
        <label for="userId">ID</label>
        <input type="text" id="userId" name="userId">
        <label for="userPwd">PASSWORD</label>
        <input type="text" id="userPwd" name="userPwd">
        <label for="userName">USER_NAME</label>
        <input type="text" id="userName" name="userName">
        <label for="userBirth">UserBirth</label>
        <input type="text" id="userBirth" name="userBirth">
        <label for="userPhone">UserPhone</label>
        <input type="text" id="userPhone" name="userPhone">
        <input type="button" id="loginButton" value="전송" onclick="login()"/>
    </form>
</body>
<script>

</script>
</html>
