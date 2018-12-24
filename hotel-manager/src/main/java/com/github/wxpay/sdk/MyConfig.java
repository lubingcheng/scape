package com.github.wxpay.sdk;

import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * @program: wxpay-sdk
 * @Date: 2018/12/16 0016 下午 4:40
 * @Author: <.*)#)))<
 * @Description:
 */

@Component
public  class MyConfig extends WXPayConfig {

    private byte[] certData;

    public MyConfig()  {

        String certPath = this.getClass().getResource("/").getPath() +"/apiclient_cert.p12";
        //String certPath = "E:\\Fanl\\2018\\景区导航\\cert\\apiclient_cert.p12";
        File file = new File(certPath);
        InputStream certStream = null;
        try {
            certStream = new FileInputStream(file);

            this.certData = new byte[(int) file.length()];
            certStream.read(this.certData);
            certStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getAppID() {
        return "wx373e687a926f4bac";
    }

    public String getMchID() {
        return "1499624232";
    }

    public String getKey() {
        return "ef2d4efe29f62564ccb0dbb00e79cc93";
    }

    public InputStream getCertStream() {
        ByteArrayInputStream certBis = new ByteArrayInputStream(this.certData);
        return certBis;
    }

    public int getHttpConnectTimeoutMs() {
        return 8000;
    }

    public int getHttpReadTimeoutMs() {
        return 10000;
    }



    public IWXPayDomain getWXPayDomain(){
        return new MyDomain();
    };


}
