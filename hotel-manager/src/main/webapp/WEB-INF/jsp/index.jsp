<%--
  Created by IntelliJ IDEA.
  User: fanl
  Date: 2018/12/17
  Time: 17:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head >
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    <title></title>
    <script>


        window.onload=function (ev) {
            document.getElementById("message").innerHTML = "开始调用方法";
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        }

        function onBridgeReady(){
            document.getElementById("message").innerHTML="调用成功";
            debugger;
            //var timeStamp = ((new Date()).valueOf()/1000).toString().split('.')[0];
            //document.getElementById("message").innerHTML = timeStamp;
            var appid = document.getElementById("form_appId").value;
            document.getElementById("message").innerHTML= appid;
            var nonce_str = document.getElementById("form_nonce_str").value;
            document.getElementById("message").innerHTML= nonce_str;
            var prepay_id = document.getElementById("form_prepay_id").value;
            document.getElementById("message").innerHTML= prepay_id;
            var paySign = document.getElementById("form_paySign").value;
            document.getElementById("message").innerHTML= paySign;
            var timeStamp = document.getElementById("form_timeStamp").value;
            document.getElementById("message").innerHTML= "timeStamp:"+timeStamp;

            var out_trade_no = document.getElementById("form_out_trade_no").value;
            document.getElementById("message").innerHTML= "timeStamp:"+out_trade_no;

            var openid = document.getElementById("form_openid").value;
            document.getElementById("message").innerHTML= "timeStamp:"+openid;

            var sendObj = {
                "appId": appid,
                "timeStamp":timeStamp,
                "nonceStr":nonce_str,
                "package":"prepay_id="+prepay_id,
                "signType":"MD5",
                "paySign":paySign,
            }



            WeixinJSBridge.invoke('getBrandWCPayRequest', sendObj, function(res){
                document.getElementById("message").innerHTML ="err_msg:"+ res.err_msg;
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    alert("支付成功！");
                    window.location.href ="http://pay.xixiawangluo.com/gis/";
                }
                document.getElementById("message").innerHTML = res.err_msg;
            });
            document.getElementById("appId").innerHTML="appId:"+sendObj.appId;
            document.getElementById("timeStamp").innerHTML="timeStamp:"+sendObj.timeStamp;
            document.getElementById("nonceStr").innerHTML="nonceStr:"+sendObj.nonceStr;
            document.getElementById("paySign").innerHTML="paySign:"+sendObj.paySign;
            document.getElementById("prepay_id").innerHTML="prepay_id:"+sendObj.package;
            document.getElementById("out_trade_no").innerHTML="signType:"+sendObj.signType;
            document.getElementById("openid").innerHTML="openid-paySign:"+paySign;

            document.getElementById("message").innerHTML= "调用结束";
        }

    </script>


</head>
<body>


    <form>
        <input type="hidden" id="form_appId" value="${appId}">
        <input type="hidden" id="form_nonce_str" value="${nonce_str}">
        <input type="hidden" id="form_paySign" value="${paySign}">
        <input type="hidden" id="form_prepay_id" value="${prepay_id}">
        <input type="hidden" id="form_timeStamp" value="${timeStamp}">
        <input type="hidden" id="form_out_trade_no" value="${out_trade_no}">
        <input type="hidden" id="form_openid" value="${openid}">
    </form>
    <div style="display: none">
        <div  id="appId">DIVappId :${appId}</div>
        <div id="timeStamp">DIVtimeStamp</div>
        <div id="nonceStr">DIVnonceStr</div>
        <div id="paySign">DIVpaySign</div>
        <div id="prepay_id">DIVprepay_id</div>
        <div id="out_trade_no">DIVout_trade_no</div>
        <div id="openid">DIVopenid</div>
        <div id="message">DIVpaySign</div>
    </div>
</body>
</html>
