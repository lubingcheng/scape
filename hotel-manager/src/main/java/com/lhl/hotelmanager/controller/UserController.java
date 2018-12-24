package com.lhl.hotelmanager.controller;

import com.github.wxpay.sdk.MyConfig;
import com.github.wxpay.sdk.WXPay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @program: hotel-manager
 * @Date: 2018/11/6 0006 下午 7:10
 * @Author: <.*)#)))<
 * @Description:
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    HttpServletRequest request;


    @GetMapping(value = "/pay", produces = "application/json;charset=UTF-8")
    public Map<String, String> Pay(){
        Map<String, String> resp = new HashMap<>();
        MyConfig config = null;
        try {
            config = new MyConfig();

            WXPay wxpay = new WXPay(config);

            Map<String, String> data = new HashMap<String, String>();
            data.put("body", "腾讯充值中心-QQ会员充值");
            data.put("out_trade_no", "2016090910595900000012");
            data.put("device_info", "");
            data.put("fee_type", "CNY");
            data.put("total_fee", "1");
            data.put("spbill_create_ip", "123.12.12.123");
            data.put("notify_url", "http://www.example.com/wxpay/notify");
            data.put("trade_type", "JSAPI");  // 此处指定为扫码支付
            data.put("product_id", "12");

            resp= wxpay.unifiedOrder(data);
            //System.out.println(resp);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resp;
    }



}
