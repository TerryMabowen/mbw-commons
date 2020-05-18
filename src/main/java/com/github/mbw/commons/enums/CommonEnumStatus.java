package com.github.mbw.commons.enums;

import com.github.mbw.commons.kit.lang.EnumStatusUtil;

/**
 * @author Mabowen
 * @date 2019-12-20 17:14
 */
public enum CommonEnumStatus implements EnumStatus, IEnumStatus {
    /**
     * 未知状态
     */
    UNKOWN(-10000, "未知状态");

    private Integer value;
    private String desc;

    @Override
    public EnumStatus getEnumStatus(int value) {
        return EnumStatusUtil.getStatusByValue(CommonEnumStatus.class, value);
    }

    @Override
    public Integer getValue() {
        return this.value;
    }

    @Override
    public String getDesc() {
        return this.desc;
    }

    private CommonEnumStatus(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

}
