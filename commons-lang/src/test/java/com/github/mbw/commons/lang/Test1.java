package com.github.mbw.commons.lang;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-05-19 14:26
 */
public class Test1 {
    private static final Logger log = LoggerFactory.getLogger(Test1.class);

    @Test
    public void f1() {
        System.out.println("16 << 1 : " + (16 << 1));
        System.out.println("16 >> 3 : " + (16 >> 3));
        System.out.println("16 >> 10 : " + (16 >> 10));
        System.out.println("1 >> 1 : " + (1 >> 1));
        System.out.println("16 >>> 2 : " + (16 >>> 2));
        System.out.println("-16 >> 2 : " + (-16 >> 2));
        System.out.println("-16 << 2 : " + (-16 << 2));
        System.out.println("-16 >>> 2 : " + (-16 >>> 2));
    }

    @Test
    public void f2() {
        log.error("xxxx");
    }
}
