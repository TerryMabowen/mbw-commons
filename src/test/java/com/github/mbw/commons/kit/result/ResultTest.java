package com.github.mbw.commons.kit.result;

import com.github.mbw.commons.constant.ExcelConst;
import com.github.mbw.commons.results.ResponseBean;
import com.github.mbw.commons.results.ResponsePage;
import com.github.mbw.commons.results.ResponseResults;
import com.google.common.collect.Lists;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-05-19 09:33
 */
public class ResultTest {

    @Test
    public void f1() {
        ResponsePage result = ResponsePage.newFailed("未知错误");
        System.out.println(result);

        List<ExcelConst> list = Lists.newArrayList();
        ResponsePage pageResult = ResponsePage.newSuccess("分页查询成功", list, 1);
        System.out.println(pageResult);
    }

    @Test
    public void f2() {
        ResponseResults results = ResponseResults.newSuccess("查询成功", new HashMap<>());
        System.out.println(results);

        ResponseResults responseResults = ResponseResults.newFailed("500错误", null);
        System.out.println(responseResults);
    }

    @Test
    public void f3() {
        ResponseBean<ExcelConst> responseBean = ResponseBean.newSuccess("请求成功", new ExcelConst());
        if (responseBean.getCode() == ResponseBean.OK) {
            System.out.println(responseBean);
        }

        ResponseBean<ExcelConst> responseBean2 = ResponseBean.newFailed("请求失败", null);
        if (responseBean2.getCode() == ResponseBean.ERROR) {
            System.out.println(responseBean2);
        }
    }
}
