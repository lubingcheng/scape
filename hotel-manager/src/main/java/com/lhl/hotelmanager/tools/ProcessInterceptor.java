package com.lhl.hotelmanager.tools;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @program: hotel-manager
 * @Date: 2018/11/13 0013 上午 9:22
 * @Author: <.*)#)))<
 * @Description:
 */
@Component
public class ProcessInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String originHeader = request.getHeader("Origin");
        //简单请求方法 可以设置为 *  复杂请求 不能设置为*
        response.setHeader("Access-Control-Allow-Origin", originHeader);
        response.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        response.setHeader("Access-Control-Allow-Credentials","true");
        response.setHeader("Access-Control-Max-Age","3600");

        String method= request.getMethod();

        if (method.equals("OPTIONS")){
            response.setStatus(200);
            return false;
        }

        //System.out.println(method);

        return true;
    }
}
