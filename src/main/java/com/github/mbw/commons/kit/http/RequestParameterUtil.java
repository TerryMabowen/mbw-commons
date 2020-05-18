package com.github.mbw.commons.kit.http;

import java.util.Arrays;
import java.util.Map;

/**
 * 请求参数处理工具类
 *
 * @author Mabowen
 * @date 2020-03-16 11:27
 */
public class RequestParameterUtil {

    /**
     * 请求参数是
     * @author Mabowen
     * @date 11:28 2020-03-16
     */
    public static void discopeParams(Map<String, String[]> map) {
        if (map != null && !map.isEmpty()) {
            for (Map.Entry<String, String[]> entry : map.entrySet()) {
                System.out.println(entry.getKey());
                System.out.println(Arrays.toString(entry.getValue()));
            }
        }
    }
}
