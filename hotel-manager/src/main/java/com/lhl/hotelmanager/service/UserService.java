package com.lhl.hotelmanager.service;

import com.lhl.hotelmanager.entity.RegisterUser;

import java.util.List;

/**
 * @program: hotel-manager
 * @Date: 2018/12/19 0019 下午 3:33
 * @Author: <.*)#)))<
 * @Description:
 */

public interface UserService {

    List<RegisterUser> FindUserByOpenIdAndMap(String openId, String map);

    List<RegisterUser> FindUserByOpenId(String openId);

    int InsertRegisterUser(RegisterUser user);
}
