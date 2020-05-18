package com.github.mbw.commons.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-04-11 22:43
 */
@Getter
@AllArgsConstructor
public enum EnumDataType implements BaseEnumStatus<Integer>{
    INT(1, "int"),
    FLOAT(2, "float"),
    DOUBLE(3, "double"),
    STRING(4, "string"),
    DATE(5, "date"),
    BOOL(6, "boolean");

    private Integer value;

    private String desc;
}
