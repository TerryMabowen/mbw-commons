package com.github.mbw.commons.kit.convert;


import org.apache.commons.lang3.StringUtils;

import java.util.*;

/**
 * @author Mabowen
 * @date 2019-11-09 13:46
 */
public class ConvertUtil {

    /**
     * 将set集合拼接成为字符串id，以，分隔
     *
     * @author Mabowen
     * @date 13:47 2019-11-09
     */
    public static <T> String convertSetToStr(Set<T> vars) {
        if (vars == null || vars.isEmpty()) {
            return "";
        } else {
            StringBuilder str = new StringBuilder();
            int lastIndex = vars.size() - 1;
            int i = 0;
            for (T var : vars) {
                if (i == lastIndex) {
                    str.append(var);
                } else {
                    str.append(var).append(",");
                }
                i++;
            }
            return str.toString();
        }
    }

    /**
     * 将以，分隔的字符串id转换为Set<Long>
     *
     * @author Mabowen
     * @date 13:49 2019-11-09
     */
    public static Set<Long> convertStrToSet(String str) {
        if (StringUtils.isNotBlank(str)) {
            Set<Long> ids = new HashSet<>();
            String[] split = str.trim().split(",");
            if (split.length > 0) {
                for (String s : split) {
                    ids.add(Long.parseLong(s.trim()));
                }
            }
            return ids;
        }
        return Collections.emptySet();
    }

    /**
     * 将以逗号分隔的字符串转为Set<String>
     *
     * @author Mabowen
     * @date 13:42 2019-12-11
     */
    public static Set<String> convertStrToSetString(String str) {
        if (StringUtils.isNotBlank(str)) {
            String[] split = str.trim().split(",");
            if (split.length > 0) {
                return new HashSet<String>(Arrays.asList(split));
            }
        }
        return Collections.emptySet();
    }

    /**
     * 将以，隔开的id字符串转换成list
     *
     * @author Mabowen
     * @date 10:51 2019-11-14
     */
    public static List<String> convertStrToList(String str) {
        if (StringUtils.isNotBlank(str)) {
            String[] split = str.trim().split(",");
            if (split.length > 0) {
                return new ArrayList<>(Arrays.asList(split));
            }
        }
        return Collections.emptyList();
    }

    /**
     *
     * 将字符串集合拼接成一个字符串
     * @author Mabowen
     * @date 11:19 2019-11-26
     */
    public static <T> String convertListToStr(List<T> vars) {
        StringBuilder builder = new StringBuilder();
        if (vars != null && !vars.isEmpty()) {
            for (int i = 0; i < vars.size(); i++) {
                if (i == (vars.size() - 1)) {
                    builder.append(vars.get(i));
                } else {
                    builder.append(vars.get(i)).append(",");
                }
            }
        }
        return builder.toString();
    }
}
