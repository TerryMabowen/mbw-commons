package com.github.mbw.commons.util.convert;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Mabowen
 * @date 2020-01-08 09:22
 */
public class CollectionsUtil {

    /**
     * 对多个集合并集，将多个集合合并成一个集合，对一个集合元素去重
     *
     * @author Mabowen
     * @date 09:23 2020-01-08
     * @param args 多个list集合
     * @return
     */
    @SafeVarargs
    public static <T>List<T> convergence(List<T>... args) {
        Set<T> set = new HashSet<>();
        for (List<T> arg : args) {
            set.addAll(arg);
        }
        return new ArrayList<>(set);
    }
}
