package com.lhl.hotelmanager.tools;

import com.alibaba.fastjson.JSONObject;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * @program: hotel-manager
 * @Date: 2018/11/12 0012 下午 6:58
 * @Author: <.*)#)))<
 * @Description: Rest接口返回统一结构
 */
//拦截所有controller目录下请求
@ControllerAdvice(basePackages = "com.lhl.hotelmanager.controller")
public class RestResultWarpper implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        ResultMap result = new ResultMap(true,"0",null,body);
        return JSONObject.toJSON(result);
    }
}
