package com.github.mbw.commons.core;

import cn.hutool.core.convert.Convert;
import org.junit.Test;

import java.math.BigDecimal;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-05-19 14:26
 */
public class Test1 {

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
        BigDecimal sda = Convert.toBigDecimal("cvsvds");
        System.out.println(sda);
    }
}
