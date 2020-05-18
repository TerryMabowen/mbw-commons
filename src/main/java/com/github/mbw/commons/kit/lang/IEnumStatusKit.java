package com.github.mbw.commons.kit.lang;


import com.github.mbw.commons.enums.CommonEnumStatus;
import com.github.mbw.commons.enums.IEnumStatus;

/**
 * 针对value为 T 类型的枚举类通过value和desc获取对应的desc和value
 *
 * @author Mabowen
 * @date 2020-04-10 20:35
 */
@Deprecated
public final class IEnumStatusKit {

    public static <T> IEnumStatus getStatusByValue(Class<?> enums, T value) {
        if (enums.isEnum()) {
            Object[] statuses = enums.getEnumConstants();

            for (Object o : statuses) {
                IEnumStatus<T> status = (IEnumStatus<T>) o;
                if (status.getValue().equals(value)) {
                    return status;
                }
            }
        }

        return CommonEnumStatus.UNKOWN;
    }

    public static <T> IEnumStatus getStatusByDesc(Class<?> enums, T desc) {
        if (enums.isEnum()) {
            Object[] statuses = enums.getEnumConstants();

            for (Object o : statuses) {
                IEnumStatus<T> status = (IEnumStatus<T>) o;
                if (status.getDesc().equals(desc)) {
                    return status;
                }
            }
        }

        return CommonEnumStatus.UNKOWN;
    }
}
