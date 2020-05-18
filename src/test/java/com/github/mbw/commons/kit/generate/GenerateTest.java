package com.github.mbw.commons.kit.generate;

import com.github.mbw.commons.kit.uuid.GenerateCodeKit;
import org.junit.Test;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-05-18 18:50
 */
public class GenerateTest {

    @Test
    public void f1() {
        String code = GenerateCodeKit.generateBusinessCode();
        System.out.println(code);
    }
}
