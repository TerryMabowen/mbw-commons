package com.github.mbw.commons.kit.lang;

import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

/**
 * 过滤掉map集合中key或value为空的值
 *
 * @author Mabowen
 * @date 2020-03-16 10:43
 */
public class MapUtil {

    /**
     * 移除map中空key或者value空值
     * @author Mabowen
     * @date 10:45 2020-03-16
     */
    public static void removeNullEntry(Map map) {
        removeNullKey(map);
        removeNullValue(map);

    }

    public static void removeNullKey(Map map) {
        if (map != null && !map.isEmpty()) {
            Iterator iterator = map.entrySet().iterator();
            while (iterator.hasNext()) {
                Object next = iterator.next();
                remove(next, iterator);
            }
        }
    }

    /**
     *
     * @author Mabowen
     * @date 10:52 2020-03-16
     */
    public static void removeNullValue(Map map) {
        if (map != null && !map.isEmpty()) {
            Iterator iterator = map.entrySet().iterator();
            while (iterator.hasNext()) {
                Object next = iterator.next();
                Object value = map.get(next);
                remove(value, iterator);
            }
        }
    }

    /**
     * 移除map中的空值
     * Iterator 是工作在一个独立的线程中，并且拥有一个 mutex 锁。
     * Iterator 被创建之后会建立一个指向原来对象的单链索引表，当原来的对象数量发生变化时，这个索引表的内容不会同步改变，
     * 所以当索引指针往后移动的时候就找不到要迭代的对象，所以按照 fail-fast 原则 Iterator 会马上抛出 java.util.ConcurrentModificationException 异常。
     * 所以 Iterator 在工作的时候是不允许被迭代的对象被改变的。
     * 但你可以使用 Iterator 本身的方法 remove() 来删除对象， Iterator.remove() 方法会在删除当前迭代对象的同时维护索引的一致性。
     *
     * @author Mabowen
     * @date 10:52 2020-03-16
     */
    private static void remove(Object obj, Iterator iterator) {
        if (obj instanceof String) {
            String str = String.valueOf(obj);
            if (StringUtils.isBlank(str)) {
                iterator.remove();
            }
        } else if (obj instanceof Collection) {
            Collection col = (Collection) obj;
            if (col.isEmpty()) {
                iterator.remove();
            }
        } else if (obj instanceof Map) {
            Map map = (Map) obj;
            if (map.isEmpty()) {
                iterator.remove();
            }
        } else if (obj instanceof Object[]) {
            Object[] array = (Object[]) obj;
            if (array.length <= 0) {
                iterator.remove();
            }
        } else {
            if (null == obj) {
                iterator.remove();
            }
        }
    }

    /**
     * 过滤map中空字符串参数
     * @author Mabowen
     * @date 11:31 2020-03-16
     */
    public static Map<String, Object> filterEmptyParam(Map<String, Object> map){
        Map<String, Object> result = Maps.newHashMap();
        map = Maps.filterValues(map, s -> s != null && (!(s instanceof String) || !(String.valueOf(s)).isEmpty()));
        result.putAll(map);
        return result;
    }
}
