package com.lhl.hotelmanager.tools.discard;

import java.text.*;
import java.util.Date;

/**
 * @program: hotel-manager
 * @Date: 2018/11/6 0006 下午 7:49
 * @Author: <.*)#)))<
 * @Description: jackJson dateFormat 实现类 暂时不使用（目前使用FastJson）
 */
public class MyDateFormat extends DateFormat {

    private DateFormat dateFormat;

    private SimpleDateFormat format1 = new SimpleDateFormat("yyy-MM-dd HH:mm:ss");

    public MyDateFormat(DateFormat dateFormat) {
        this.dateFormat = dateFormat;
    }

    @Override
    public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition fieldPosition) {
        return dateFormat.format(date, toAppendTo, fieldPosition);
    }

    @Override
    public Date parse(String source, ParsePosition pos) {
        Date date = null;
        try {

            date = format1.parse(source, pos);
        } catch (Exception e) {

            date = dateFormat.parse(source, pos);
        }
        return date;
    }

    // 主要还是装饰这个方法
    @Override
    public Date parse(String source) throws ParseException {
        Date date = null;
        try {

            // 先按我的规则来
            date = format1.parse(source);
        } catch (Exception e) {

            // 不行，那就按原先的规则吧
            try {
                date = dateFormat.parse(source);
            } catch (ParseException e1) {
                e1.printStackTrace();
            }
        }

        return date;
    }

    // 这里装饰clone方法的原因是因为clone方法在中也有用到
    @Override
    public Object clone() {
        Object format = dateFormat.clone();
        return new MyDateFormat((DateFormat) format);
    }

}
