package com.lhl.hotelmanager.service.Impl;

import com.lhl.hotelmanager.dao.PointDao;
import com.lhl.hotelmanager.entity.Point;
import com.lhl.hotelmanager.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: hotel-manager
 * @Date: 2018/12/20 0020 上午 10:43
 * @Author: <.*)#)))<
 * @Description:
 */
@Service(value = "pointService")
public class PointServiceImpl implements PointService {

    @Autowired(required = false)
    PointDao pointDao;

    @Override
    public List<Point> getAllPoint() {
        return pointDao.getAllPoint();
    }

    @Override
    public int updatePointById(Point point) {
        return pointDao.updatePoint(point);
    }

    @Override
    public int deletePointById(int id) {
        return pointDao.deletePointById(id);
    }


}
