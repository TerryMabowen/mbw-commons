package com.github.mbw.commons.test;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.StrUtil;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-05-20 10:55
 */
public class StrTest {
    public static void main(String[] args) {
        boolean fas = StrUtil.isNotBlank("");
        System.out.println(fas);
        DateTime now = DateTime.now();
        System.out.println(now);
        long l = DateUtil.currentSeconds();
        System.out.println(l);
    }
}
