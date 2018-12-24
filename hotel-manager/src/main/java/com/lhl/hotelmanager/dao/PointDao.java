package com.lhl.hotelmanager.dao;

import com.lhl.hotelmanager.entity.Point;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @program: hotel-manager
 * @Date: 2018/12/20 0020 上午 10:36
 * @Author: <.*)#)))<
 * @Description:
 */
@Mapper
public interface PointDao {

    List<Point> getAllPoint();

    int insertPoint(Point point);

    int updatePoint(Point point);

    int deletePoint(int id);
}
