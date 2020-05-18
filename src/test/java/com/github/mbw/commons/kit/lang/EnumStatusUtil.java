package com.github.mbw.commons.kit.lang;

import cn.mbw.oc.common.enums.CommonEnumStatus;
import cn.mbw.oc.common.enums.EnumStatus;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

/**
 * 枚举类工具类
 * @author Mabowen
 * @date 2019-12-20 17:08
 */
@Deprecated
public class EnumStatusUtil {
    public EnumStatusUtil() {
    }

    public static EnumStatus getStatusByValue(Class<?> enums, Integer value) {
        if (enums.isEnum()) {
            Object[] statuses = enums.getEnumConstants();

            for (Object o : statuses) {
                EnumStatus status = (EnumStatus) o;
                if (status.getValue().equals(value)) {
                    return status;
                }
            }
        }

        return CommonEnumStatus.UNKOWN;
    }

    public static EnumStatus getStatusByDesc(Class<?> enums, String desc) {
        if (enums.isEnum()) {
            Object[] statuses = enums.getEnumConstants();

            for (Object o : statuses) {
                EnumStatus status = (EnumStatus) o;
                if (status.getDesc().equals(desc)) {
                    return status;
                }
            }
        }

        return CommonEnumStatus.UNKOWN;
    }

    public static List<Hashtable> getListByEnum(Class<?> enums, String sta) {
        List<Hashtable> resList = new ArrayList();
        Hashtable allTab = new Hashtable();
        allTab.put(sta + "_value", "-1");
        allTab.put(sta + "_name", "全部");
        resList.add(0, allTab);
        if (enums.isEnum()) {
            Object[] statuses = enums.getEnumConstants();

            for(int i = 0; i < statuses.length; ++i) {
                EnumStatus status = (EnumStatus)statuses[i];
                Hashtable tab = new Hashtable();
                tab.put(sta + "_value", status.getValue());
                tab.put(sta + "_name", status.getDesc());
                resList.add(i + 1, tab);
            }
        }

        return resList;
    }

    public static List<Hashtable> getDataListByEnum(Class<?> enums, String sta) {
        List<Hashtable> resList = new ArrayList();
        if (enums.isEnum()) {
            Object[] statuses = enums.getEnumConstants();

            for(int i = 0; i < statuses.length; ++i) {
                EnumStatus status = (EnumStatus)statuses[i];
                Hashtable tab = new Hashtable();
                tab.put(sta + "_value", status.getValue());
                tab.put(sta + "_name", status.getDesc());
                resList.add(i, tab);
            }
        }

        return resList;
    }
}
