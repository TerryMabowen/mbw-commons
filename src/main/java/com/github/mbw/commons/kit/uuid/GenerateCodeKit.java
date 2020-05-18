package com.github.mbw.commons.kit.uuid;

import com.github.mbw.commons.kit.date.DateKit;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

/**
 * @author Mabowen
 * @date 2019-12-10 09:33
 */
@Slf4j
public class GenerateCodeKit {
    private final static String DATE_FORMAT = "yyyyMMddHHmmssSSS";
    private static int sed  = 0;

    /**
     * 生成业务ID-按业务规则生成 年月日时分秒加一个3位随机数
     * @author Mabowen
     * @date 2020/02/28 11:41
     * @param
     * @return {@link String}
     */
    public synchronized static String generateBusinessCode() {
        String prefix = DateKit.format(new Date(), DATE_FORMAT);

        synchronized (GenerateCodeKit.class) {
            sed++;
            if (sed > 999) {
                sed = 1;
            }
        }

        String suffix = String.format("%03d", sed);

        return prefix + suffix;
    }

}
