package com.github.wxpay.sdk;

/**
 * @program: wxpay-sdk
 * @Date: 2018/12/16 0016 下午 4:59
 * @Author: <.*)#)))<
 * @Description:
 */
public class MyDomain implements IWXPayDomain {
    public void report(String domain, long elapsedTimeMillis, Exception ex) {

    }

    public DomainInfo getDomain(WXPayConfig config) {
        return new IWXPayDomain.DomainInfo(WXPayConstants.DOMAIN_API, true);
    }
}
