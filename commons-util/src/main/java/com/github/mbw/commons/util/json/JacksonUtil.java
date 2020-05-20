package com.github.mbw.commons.util.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mbw.commons.lang.json.JacksonFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-05-20 17:08
 */
public class JacksonUtil {
    private static final Logger log = LoggerFactory.getLogger(JacksonUtil.class);

    public static String toJson(Object var) {
        try {
            ObjectMapper objectMapper = JacksonFactory.getInstance()
                    .getObjectMapper();
            return objectMapper.writeValueAsString(var);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            log.error("Object to json string error: {}" + e.getMessage(), e);
            return StringUtils.EMPTY;
        }
    }

    public static <T> T toObject(String var, Class<T> clz) {
        try {
            ObjectMapper objectMapper = JacksonFactory.getInstance()
                    .getObjectMapper();

            return objectMapper.readValue(var, clz);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            log.error("json string to Object error: {}" + e.getMessage(), e);
            return null;
        }
    }
}
