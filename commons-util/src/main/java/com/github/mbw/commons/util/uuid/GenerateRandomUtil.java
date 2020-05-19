package com.github.mbw.commons.util.uuid;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * @author Mabowen
 * @date 2019-12-10 09:33
 */
@Slf4j
@Component
public class GenerateRandomUtil {
    private static List<String> codeList = new ArrayList<>();

    /**
     * 生成业务ID-按业务规则生成 年月日时分秒加一个3位随机数
     *
     * @author Mabowen
     * @date 10:25 2019-12-10
     */
    public synchronized static String generateBusinessCode() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm-ssSSS");
        Date now = new Date();
        String prefix = sdf.format(now);
        int ranNum = (int) (new Random().nextDouble() * (999 - 100 + 1)) + 100;
        String businessCode = prefix + "-" + ranNum;
        if (!codeList.contains(businessCode)) {
            codeList.add(businessCode);
            return businessCode;
        } else {
            return generateBusinessCode();
        }
    }

    /**
     * 每隔一小时清空一次codeList,释放内存
     *
     * @author Mabowen
     * @date 10:40 2019-12-10
     */
    @Scheduled(cron = "0 0 0/1 * * ? ")
    public static void clearCollectorsVariable() {
        if (!codeList.isEmpty()) {
            codeList.clear();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String nowDate = simpleDateFormat.format(new Date());
            log.info("清空保存生成的流程业务id的集合成功，当前时间为：" + nowDate);
        }
    }
}
