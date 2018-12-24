package com.lhl.hotelmanager.dao;

import com.lhl.hotelmanager.entity.RegisterUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @program: hotel-manager
 * @Date: 2018/12/19 0019 下午 3:33
 * @Author: <.*)#)))<
 * @Description:
 */
@Mapper
public interface UserDao  {

    List<RegisterUser> FindUserByOpenIdAndMap(String openId,String map);

    List<RegisterUser> FindUserByOpenId(String openId);

    int InsertRegisterUser(RegisterUser user);
}
