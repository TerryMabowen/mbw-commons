package com.github.mbw.commons.util.encryption;

import com.github.mbw.commons.lang.exception.ServiceException;
import org.apache.commons.lang3.StringUtils;

import java.util.Base64;

/**
 * Base64的工具类
 *
 * @author Mabowen
 * @date 2020-04-09 17:49
 */
public class Base64Kit {
    // 编码的对象
    private static final Base64.Encoder encoder = Base64.getEncoder();
    // 解码的对象
    private static final Base64.Decoder decoder = Base64.getDecoder();

    /**
     * Base64编码
     * @author Mabowen
     * @date 18:04 2020-04-09
     * @param src
     * @return
     */
    public static byte[] encode(byte[] src) {
        if (src.length <= 0) {
            throw new ServiceException("编码文件不能为空");
        }

        return encoder.encode(src);
    }

    /**
     * Base64解码
     * @author Mabowen
     * @date 17:57 2020-04-09
     * @param text
     * @return
     */
    public static byte[] decode(String text) {
        if (StringUtils.isBlank(text)) {
            throw new ServiceException("需要解码的文字不能为空");
        }

        return decoder.decode(text);
    }
}
