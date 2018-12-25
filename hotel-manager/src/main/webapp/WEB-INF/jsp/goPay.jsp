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
        function goPay(ev) {
            var openId = document.getElementById("openId").value;
            //document.getElementById("openIdMs").innerHTML = openId;
            var code = document.getElementById("code").value;
            //document.getElementById("codeMs").innerHTML = code;
            window.location.href="http://pay.xixiawangluo.com/pay/pay?openId="+openId+"&&code="+code;
        }
        
    </script>
    <style>
        .panel{
            text-align: center;
            margin-bottom: 5%;
        }
        .btnPay{
            padding: 10px;
            width: 90%;
            height: 30px;
            background: #3BAD00;
            border-radius: 5px;
            text-align: center;
            color: white;
            line-height: 30px;
            margin-left: 3.5%;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="app">
        <form>
            <input type="hidden" id="code" value="${code}">
            <input type="hidden" id="openId" value="${openId}">
        </form>
        <div class="panel">
            <img src="img/payhome.jpg" style="width: 100%;"/>
        </div>
        <div class="panel">
            金额
        </div>
        <div class="panel" style="font-size:30px;">
            ${price}元
        </div>
        <div class="btnPay" onclick="goPay()">付费查看</div>
       <%-- <div id="openIdMs"></div>
        <div id="codeMs"></div>--%>
    </div>
</body>
</html>
