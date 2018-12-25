package com.lhl.hotelmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.wxpay.sdk.MyConfig;
import com.github.wxpay.sdk.WXPay;
import com.github.wxpay.sdk.WXPayUtil;
import com.lhl.hotelmanager.entity.Point;
import com.lhl.hotelmanager.entity.RegisterUser;
import com.lhl.hotelmanager.service.PointService;
import com.lhl.hotelmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;


@Controller
public class IndexController {

    @Autowired
    UserService userService;

    @Autowired
    PointService pointService;

    @Autowired
    MyConfig config;

    private int price;

    @RequestMapping(value = {"/","/index"})
    public String index(HttpServletRequest request) throws IOException {
        Properties properties = new Properties();
        BufferedReader bufferedReader = new BufferedReader(new FileReader(this.getClass().getResource("/").getPath() +"/config.properties"));
        properties.load(bufferedReader);
        price =Integer.parseInt(properties.getProperty("price"));
        request.setAttribute("price",(float)price/100);
        String code =  request.getParameter("code");
        if(code!=null && code !="") {
            String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.getAppID() + "&secret=40712e633227ee0d302f2be2d1265cc5&code=" + code + "&grant_type=authorization_code";
            String str = sendPost(url, null);

            JSONObject json = JSONObject.parseObject(str);
            String openid = json.getString("openid");

            //System.out.println("openid:" + openid + "=============================");

            List<RegisterUser> user = userService.FindUserByOpenId(openid);
            if (user.size()>0) {
                //System.out.println("用户编号查询：" + user.toString());
                request.setAttribute("payState", "success");
            } else {
                //request.setAttribute("payState", "error");
                //System.out.println("用户没有支付,前往支付页面：code:"+code+"======openId:"+openid);
                request.setAttribute("code", code);
                request.setAttribute("openId", openid);

                return "goPay";
            }
        }else {
            request.setAttribute("payState", "error");
        }
        return  "test";
    }

    @RequestMapping(value = {"/admin"})
    public String admin(HttpServletRequest request){

        return  "admin";
    }

    /**
     * 默认页<br/>
     * @RequestMapping("/") 和 @RequestMapping 是有区别的
     * 如果不写参数，则为全局默认页，加入输入404页面，也会自动访问到这个页面。
     * 如果加了参数“/”，则只认为是根页面。
     * 可以通过localhost:8080或者localhost:8080/index访问该方法
     */
    @RequestMapping(value = {"/pay"})
    public String pay(HttpServletRequest request){

        //商户订单编号
        Random rand = new Random();
        StringBuffer sb=new StringBuffer();
        for (int i=1;i<=12;i++){
            int randNum = rand.nextInt(9)+1;
            String num=randNum+"";
            sb=sb.append(num);
        }
        String random = String.valueOf(sb)+"_1";
        //System.out.println("=========random:"+random);

        String code =  request.getParameter("code");
        //System.out.println("code:"+code+"=============================");

        Map<String, String> resp = new HashMap<>();

        try {

            String openid =  request.getParameter("openId");
            //System.out.println("openid:"+openid+"=============================");


            /*if(user == null) {
                user = new RegisterUser();
                user.setOpenId("123456");
                user.setDateTime(new Date());
                userService.InsertRegisterUser(user);
            }else {
                System.out.println(user.toString());
            }
*/


            WXPay wxpay = new WXPay(config);

            Map<String, String> data = new HashMap<String, String>();
            data.put("body", "payforQQMoney");
            data.put("out_trade_no", random);
            data.put("device_info", "");
            data.put("fee_type", "CNY");
            data.put("total_fee", String.valueOf(price));
            data.put("spbill_create_ip", "123.12.12.123");
            data.put("notify_url", "http://pay.xixiawangluo.com/pay/payCallBack");
            data.put("trade_type", "JSAPI");  // 此处指定为扫码支付
            data.put("product_id", "12");
            data.put("openid", openid);
            //System.out.println("=========openid:"+openid);
            resp= wxpay.unifiedOrder(data);

            //System.out.println(resp);

            //得到带预支付prepay_id
            String prepay_id= resp.get("prepay_id");
            //拼接组成新的sign并加密
            String timestamp = String.valueOf(new Date().getTime()/1000);
            //System.out.println("=========time:"+timestamp);

            Map<String,String> singData = new HashMap<>();
            singData.put("appId",config.getAppID());
            singData.put("timeStamp",timestamp);
            singData.put("nonceStr",resp.get("nonce_str"));
            singData.put("package","prepay_id="+prepay_id);
            singData.put("signType","MD5");
            //String stringA =""+"appid="+config.getAppID()+"&nonce_str="+resp.get("nonce_str") +"&package=prepay_id="+prepay_id+"&signType=MD5"+"&timeStamp=" + timestamp + "&key="+config.getKey();
            //System.out.println("=========stringA:"+stringA);
            String sign = WXPayUtil.generateSignature(singData,config.getKey());
            //System.out.println("=========sign:"+sign);

            request.setAttribute("appId", config.getAppID());
            request.setAttribute("timeStamp",timestamp);
            request.setAttribute("nonce_str",resp.get("nonce_str"));
            request.setAttribute("paySign",sign);
            request.setAttribute("prepay_id",resp.get("prepay_id"));

        /*    request.setAttribute("out_trade_no",random);*/
            request.setAttribute("openid",openid);

        } catch (Exception e) {
            e.printStackTrace();
        }


        return "index";
    }

    @RequestMapping(value = "payCallBack")
    @ResponseBody
    public void payCallBack(HttpServletRequest request, HttpServletResponse response) throws Exception {

        //System.out.println("微信支付回调");
        InputStream inStream = request.getInputStream();
        ByteArrayOutputStream outSteam = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outSteam.write(buffer, 0, len);
        }
        String resultxml = new String(outSteam.toByteArray(), "utf-8");

        //System.out.println("resultxml=======:"+resultxml);

        Map<String, String> params = WXPayUtil.xmlToMap(resultxml);
        outSteam.close();
        inStream.close();

        //MyConfig config = new MyConfig();

        Map<String,String> return_data = new HashMap<String,String>();
        if (!WXPayUtil.isSignatureValid(params,config.getKey())) {
            // 支付失败
            //System.out.println("支付失败");

            return_data.put("return_code", "FAIL");
            return_data.put("return_msg", "return_code不正确");

            response.getWriter().write(WXPayUtil.mapToXml(return_data));
            //return ;
        } else {
            //System.out.println("===============付款成功==============");

            String total_fee = params.get("total_fee");
            double v = Double.valueOf(total_fee) / 100;
            String out_trade_no =  params.get("out_trade_no");
            String openid =  params.get("openid");

            //System.out.println("openid:"+openid);

            int mapId = Integer.parseInt(out_trade_no.split("_")[1]);

            //System.out.println("mapId:"+mapId);
           /* Date accountTime = DateUtil.stringtoDate(params.get("time_end"), "yyyyMMddHHmmss");
            String ordertime = DateUtil.dateToString(new Date(), "yyyy-MM-dd HH:mm:ss");
            String totalAmount = String.valueOf(v);
            String appId = params.get("appid");*/
            String tradeNo = params.get("transaction_id");
            //System.out.println("tradeNo:"+tradeNo);

            RegisterUser user = new RegisterUser();
            user.setOpenId(openid);
            user.setMapId(mapId);
            user.setDateTime(new Date());
            user.setPayId(tradeNo);
           // System.out.println("RegisterUser:"+user.toString());
            int i = userService.InsertRegisterUser(user);
           // System.out.println("RegisterUser新增状态:"+i);

            return_data.put("return_code", "SUCCESS");
            return_data.put("return_msg", "OK");
            response.getWriter().write(WXPayUtil.mapToXml(return_data));
        }
    }

    @RequestMapping(value = "getAllPoint")
    @ResponseBody
    public List<Point> getAllPoint(){
        List<Point> points = pointService.getAllPoint();
        return  points;
    }


    public static String sendPost(String url, String param) {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性


            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.setRequestProperty("Accept-Charset", "UTF-8");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            //System.out.println("young312"+param);
            out.print(param);
            // flush输出流的缓冲
            out.flush();

            // 定义BufferedReader输入流来读取URL的响应

            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));

            String line;
            while ((line = in.readLine()) != null) {
                result += line;
                //System.out.println(result);
            }


        } catch (Exception e) {
            //System.out.println("发送 POST 请求出现异常！"+e);
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result;
    }

}
