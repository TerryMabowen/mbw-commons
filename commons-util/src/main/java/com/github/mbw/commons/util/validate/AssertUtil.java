package com.github.mbw.commons.util.validate;

import com.github.mbw.commons.lang.enums.BaseEnumStatus;
import com.github.mbw.commons.lang.exception.AssertException;
import com.github.mbw.commons.util.enums.EnumUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.Objects;

/**
 * @author Mabowen
 * @date 2019-12-20 17:02
 */
public class AssertUtil {
    public AssertUtil() {
    }

    public static void assertNotNull(String value, String tips) {
        if (Objects.isNull(value)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 字符串不能为空" : tips);
        }
    }

    public static void assertNotNull(String value) {
        assertNotNull((String)value, (String)null);
    }

    public static void assertNotEmpty(String value, String tips) {
        if (StringUtils.isEmpty(value)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 字符串不能为空" : tips);
        }
    }

    public static void assertNotEmpty(String value) {
        assertNotEmpty(value, (String)null);
    }

    public static void assertTel(String value, String tips) {
        assertNotNull(value, tips);
        if (!RegexUtils.isTel(value)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 不是一个有效的手机/电话号码" : tips);
        }
    }

    public static void assertTel(String value) {
        assertTel(value, (String)null);
    }

    public static void assertValidateEmail(String value, String tips) {
        assertNotNull(value, tips);
        if (!RegexUtils.isEmail(value)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 不是一个有效的邮箱地址" : tips);
        }
    }

    public static void assertValidateEmail(String value) {
        assertValidateEmail(value, (String)null);
    }

    public static void assertMobile(String value, String tips) {
        if (!RegexUtils.isMobile(value)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 不是一个有效的手机号" : tips);
        }
    }

    public static void assertMobile(String value) {
        assertMobile(value, (String)null);
    }

    public static void assertGT0(Number value, String tips) {
        if (value == null || value.longValue() <= 0L) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 必须大于0" : tips);
        }
    }

    public static void assertGT0(Number value) {
        assertGT0(value, (String)null);
    }

    public static void assertGE0(Number value, String tips) {
        if (value == null || value.doubleValue() < 0.0D) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 必须大于等于0" : tips);
        }
    }

    public static void assertNotNull(Object obj, String tips) {
        if (Objects.isNull(obj)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 对象不存在" : tips);
        }
    }

    public static void assertNotNull(Object obj) {
        assertNotNull((Object)obj, (String)null);
    }

    public static void assertEnumExist(int status, Class<? extends BaseEnumStatus> cls, String tips) {
        BaseEnumStatus value = EnumUtil.getEnumByValue(cls, status);
        if (Objects.isNull(value)) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 枚举类型不存在" : tips);
        }
    }

    public static void assertEnumExist(int status, Class<? extends BaseEnumStatus> cls) {
        assertEnumExist(status, cls);
    }

    public static void assertEqual(Object val, Object val2, String tips) {
        if (val != null && val2 != null) {
            if (!val.equals(val2)) {
                throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 两个值不相等" : tips);
            }
        } else {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 两个值不相等" : tips);
        }
    }

    public static void assertEqual(Object val, Object val2) {
        assertEqual(val, val2);
    }

    public static void assertScope(Number start, Number end, Number value, String tips) {
        if (value == null || value.doubleValue() < start.doubleValue() || value.doubleValue() > end.doubleValue()) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 数值不再范围内" : tips);
        }
    }

    public static void assertScope(Number start, Number end, Number value) {
        assertScope(start, end, value);
    }

    public static void assertTrue(Boolean value, String tips) {
        assertNotNull((Object)value);
        if (!value) {
            throw new AssertException(StringUtils.isEmpty(tips) ? "验证失败, 比如为True" : tips);
        }
    }

    public static void assertTrue(Boolean value) {
        assertTrue(value, (String)null);
    }
}
