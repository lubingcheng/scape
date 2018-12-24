package com.lhl.hotelmanager.tools.exception;

import com.alibaba.fastjson.JSONObject;
import com.lhl.hotelmanager.tools.ResultMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @program: hotel-manager
 * @Date: 2018/11/12 0012 下午 8:10
 * @Author: <.*)#)))<
 * @Description:
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Object logicExceptionHandler(HttpServletRequest request,Exception e,HttpServletResponse  response){
        ResultMap resultMap = new ResultMap(false,"-1",ErroMessage.SYSTEM_EXCEPTION,e.getMessage());
        //如果是逻辑异常，返回具体的错误代码和提示信息
        if(e instanceof LogicException){
            LogicException logicException = (LogicException) e;
            resultMap.setCode(logicException.getCode());
            resultMap.setErrorMessage(logicException.getMessage());
        }else {
            //系统异常 进行日志记录
            logger.error("系统异常："+e.getMessage(),e);
        }
        return JSONObject.toJSON(resultMap);
    }
}
