package com.github.mbw.commons.util.page;

import com.github.mbw.commons.lang.page.PageBean;

import java.util.List;

/**
 * 对list集合分页
 * @author Mabowen
 * @date 2020-03-04 17:35
 */
public class PageUtil {

    /**
     * 将list数据分页
     *
     * @author Mabowen
     * @date 11:28 2020-01-19
     * @param
     * @return
     */
    public static <T> void convertListToPage(PageBean<T> page, List<T> list) {
        // 刚开始的页面为第一页
        if (page.getCurrentPageNum() == null){
            page.setCurrentPageNum(1);
        }
        // 设置每页数据为十条
        if (page.getPageSize() == null) {
            page.setPageSize(20);
        }
        // 每页的开始位置
        page.setStartIndex((page.getCurrentPageNum() - 1) * page.getPageSize());
        // list的大小
        int count = list.size();
        // 设置总页数
        page.setTotalPage(count % page.getPageSize() == 0 ? count / page.getPageSize() : count / page.getPageSize() + 1);
        // 对list进行截取
        page.setData(list.subList(page.getStartIndex(), count - page.getStartIndex() > page.getPageSize() ? page.getStartIndex() + page.getPageSize() : count));
    }
}
