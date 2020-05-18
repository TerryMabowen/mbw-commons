package com.github.mbw.commons.kit.lang;

import cn.mbw.oc.common.enums.BaseEnumStatus;
import cn.mbw.oc.common.enums.CommonEnumStatus;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020/04/10 23:13
 */
public class EnumKit {

    public static <T> BaseEnumStatus getEnumByValue(Class<?> clz, T value) {
        if (clz.isEnum()) {
            Object[] statuses = clz.getEnumConstants();

            for (Object o : statuses) {
                BaseEnumStatus status = (BaseEnumStatus) o;
                if (status.getValue().equals(value)) {
                    return status;
                }
            }
        }

        return CommonEnumStatus.UNKOWN;
    }

    public static <T> BaseEnumStatus getEnumByDesc(Class<?> clz, T desc) {
        if (clz.isEnum()) {
            Object[] statuses = clz.getEnumConstants();

            for (Object o : statuses) {
                BaseEnumStatus status = (BaseEnumStatus) o;
                if (status.getDesc().equals(desc)) {
                    return status;
                }
            }
        }

        return CommonEnumStatus.UNKOWN;
    }
}
