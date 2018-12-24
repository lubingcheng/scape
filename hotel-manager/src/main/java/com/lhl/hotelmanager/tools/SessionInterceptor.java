package com.lhl.hotelmanager.tools;

import com.lhl.hotelmanager.tools.exception.ErroMessage;
import com.lhl.hotelmanager.tools.exception.LogicException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @program: hotel-manager
 * @Date: 2018/11/12 0012 下午 3:53
 * @Author: <.*)#)))<
 * @Description:
 */
@Component
public class SessionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        //System.out.println(request.getRequestURI());
        if(request.getRequestURI().equals("/user/login")){
            return true;
        }
        Object object = request.getSession().getAttribute("loginUser");
        if(object==null){
            throw LogicException.leException(ErroMessage.NOT_LOGIN);

        }
        return true;
    }


}
