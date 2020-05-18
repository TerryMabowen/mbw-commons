package com.github.mbw.commons.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 逻辑状态枚举
 * @author Mabowen
 * @date 2019-12-18 19:59
 */
@Getter
@AllArgsConstructor
public enum EnumLogicStatus implements BaseEnumStatus<Integer> {

    NORMAL(1, "正常"),

    DELETE(0, "删除"),

    /* **********************  ********************** */

    TRUE(1, "真"),

    FALSE(0, "假");

    private Integer value;
    private String desc;
}
