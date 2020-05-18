package com.github.mbw.commons.kit.convert;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Mabowen
 * @date 2019-12-12 09:50
 */
@Slf4j
public class TransformUtil {
    /**
     * 通过属性名称将po转化vo
     *
     * @author Mabowen
     * @date 20:52 2019-12-11
     * @param property 属性名
     */
    private void convert(Object vo, Object po, String property) {
        if (StringUtils.isNotBlank(property)) {
            try {
                Class<?> voClass = vo.getClass();
                // 属性
                Field voField = voClass.getDeclaredField(property);
                voField.setAccessible(true);
                // 属性值
                Class<?> poClass = po.getClass();
                Field poField = poClass.getDeclaredField(property);
                poField.setAccessible(true);
                Object poFieldValue = poField.get(po);
                // 属性类型
                String fieldType = voField.getGenericType().toString();
                if (StringUtils.isNotBlank(fieldType) && poFieldValue != null && StringUtils.isNotBlank(poFieldValue.toString())) {
                    switch (fieldType) {
                        case "class java.lang.String": {
                            String value = String.valueOf(poFieldValue);
                            invoke(vo, voClass, voField, value);
                            break;
                        }
                        case "class java.lang.Integer": {
                            Integer value = Integer.parseInt(String.valueOf(poFieldValue));
                            invoke(vo, voClass, voField, value);
                            break;
                        }
                        case "class java.lang.Long": {
                            Long value = Long.parseLong(String.valueOf(poFieldValue));
                            invoke(vo, voClass, voField, value);
                            break;
                        }
                        case "class java.util.Date":
                            try {
                                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                                Date value = simpleDateFormat.parse(String.valueOf(poFieldValue));
                                invoke(vo, voClass, voField, value);
                            } catch (ParseException e) {
                                e.printStackTrace();
                                log.error("字符串转换时间类型异常：" + e.getMessage(), e);
                                throw new RuntimeException("字符串转换时间类型异常：" + e.getMessage());
                            }
                            break;
                        default:
                            break;
                    }
                }
            } catch (NoSuchFieldException | IllegalAccessException | IllegalArgumentException e) {
                log.error("通过属性名称将流程实例po转化vo异常：" + e.getMessage(), e);
                throw new RuntimeException("通过属性名称将流程实例po转化vo异常：" + e.getMessage());
            }
        }
    }

    /**
     * 执行set方法
     *
     * @author Mabowen
     * @date 21:06 2019-12-11
     */
    private <T> void invoke(Object vo, Class<?> voClass, Field voField, T value) {
        try {
            String methodName = getMethodName(voField.getName());
            if (StringUtils.isNotBlank(methodName) && value != null) {
                Method setter = voClass.getMethod("set" + methodName);
                setter.invoke(vo, value);

                Method getter = voClass.getMethod("get" + methodName);
                Object val = getter.invoke(vo);
            }
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            log.error("反射执行setter方法异常：" + e.getMessage(), e);
            throw new RuntimeException("反射执行setter方法异常：" + e.getMessage());
        }
    }

    /**
     * 把一个字符串的第一个字母大写
     *
     * @author Mabowen
     * @date 21:12 2019-12-11
     */
    private String getMethodName(String fieldName) {
        if (StringUtils.isNotBlank(fieldName)) {
            byte[] items = fieldName.getBytes();
            items[0] = (byte) ((char) items[0] - 'a' + 'A');
            return new String(items);
        }
        return StringUtils.EMPTY;
    }
}
