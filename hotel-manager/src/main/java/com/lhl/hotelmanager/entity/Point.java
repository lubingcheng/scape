package com.lhl.hotelmanager.entity;

import lombok.Data;

/**
 * @program: hotel-manager
 * @Date: 2018/12/20 0020 上午 10:32
 * @Author: <.*)#)))<
 * @Description:
 */

@Data
public class Point {

    private int id;

    private int code;

    private String name;

    private int type;

    private double lon;

    private double lat;

    private String voice;
}
