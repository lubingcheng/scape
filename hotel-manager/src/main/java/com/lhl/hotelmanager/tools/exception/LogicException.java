package com.lhl.hotelmanager.tools.exception;

import lombok.Getter;
import lombok.Setter;

/**
 * @program: hotel-manager
 * @Date: 2018/11/12 0012 下午 7:49
 * @Author: <.*)#)))<
 * @Description:业务逻辑处理类
 */
@Getter
@Setter
public class LogicException extends RuntimeException{

    private String code;

    private String errorMsg;

    private LogicException(String errorMsg) {
        super(errorMsg);
        this.code = errorMsg.substring(0, 5);
        this.errorMsg = errorMsg.substring(6);
    }

    public static LogicException leException(String errorMsg){
        return  new LogicException(errorMsg);
    }

}

