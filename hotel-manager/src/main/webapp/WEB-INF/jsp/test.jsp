<%--
  Created by IntelliJ IDEA.
  User: fanl
  Date: 2018/12/17
  Time: 18:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    <title></title>
    <script>
        window.onload = function (ev) {
            var state = document.getElementById("payState").value;
            if(state == "error") {
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx373e687a926f4bac&redirect_uri=http://pay.xixiawangluo.com/pay/&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect";
            }else if(state == "success"){
                window.location.href ="http://pay.xixiawangluo.com/gis/";
            }
        }

    </script>
</head>
<body>
    <form>
        <input type="hidden" id="payState" value="${payState}">
    </form>

</body>
</html>
