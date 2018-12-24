package com.lhl.hotelmanager.service.Impl;

import com.lhl.hotelmanager.dao.UserDao;
import com.lhl.hotelmanager.entity.RegisterUser;
import com.lhl.hotelmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: hotel-manager
 * @Date: 2018/12/19 0019 下午 3:58
 * @Author: <.*)#)))<
 * @Description:
 */
@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired(required = false)
    private UserDao userDao;

    @Override
    public List<RegisterUser> FindUserByOpenIdAndMap(String openId, String map) {
        return userDao.FindUserByOpenIdAndMap(openId,map);
    }

    @Override
    public List<RegisterUser> FindUserByOpenId(String openId) {
        return userDao.FindUserByOpenId(openId);
    }

    @Override
    public int InsertRegisterUser(RegisterUser user) {
        return userDao.InsertRegisterUser(user);
    }
}
