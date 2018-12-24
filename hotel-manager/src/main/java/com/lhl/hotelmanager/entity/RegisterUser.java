package com.lhl.hotelmanager.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;

import java.util.Date;

/**
 * @program: hotel-manager
 * @Date: 2018/12/19 0019 下午 3:34
 * @Author: <.*)#)))<
 * @Description:
 */

@Data
public class RegisterUser {

    private int id;

    private String openId;

    private int mapId;

    private String payId;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date dateTime;

    private int type;

    private int IsUsed;


}
