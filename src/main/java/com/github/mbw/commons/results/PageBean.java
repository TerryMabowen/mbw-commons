package com.github.mbw.commons.results;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

/**
 * 分页类---后端业务分页
 * @author Mabowen
 * @date 2020-01-08 15:19
 */
@Data
@ToString
@Accessors(chain = true)
public class PageBean<T> implements Serializable {
    private static final long serialVersionUID = -5644250102100789603L;
    // 默认从第几页开始
    private static final int DEFAULT_CURRENT_PAGE = 1;

    // 默认的每页展示条数
    private static final int DEFAULT_PAGE_SIZE = 20;

    // 当前第几页
    private Integer currentPageNum = DEFAULT_CURRENT_PAGE;

    // 每页展示条数
    private Integer pageSize = DEFAULT_PAGE_SIZE;

    // 总页数
    private long totalPage;

    // 总数据量
    private long totalCount;

    // 分页数据
    private List<T> data;

    // 开始数据位置
    private int startIndex;

    public PageBean() {
    }

    public PageBean(int currentPageNum, int pageSize) {
        this.currentPageNum = currentPageNum;
        this.pageSize = pageSize;
    }

    // 计算总页数
    public long getPageCount() {
        this.totalPage = (this.totalCount + this.pageSize - 1) / this.pageSize;
        return this.totalPage;
    }

    // 是否是第一页
    public boolean isFirst() {
        return (this.currentPageNum == 1) || (this.totalCount == 0);
    }

    // 是否是最后一页
    public boolean isLast() {
        return (this.totalCount == 0) || (this.currentPageNum >= getPageCount());
    }

    // 是否有下一页
    public boolean isHasNext() {
        return this.currentPageNum < getPageCount();
    }

    // 是否有上一页
    public boolean isHasPrev() {
        return this.currentPageNum > 1;
    }

    // 下一页
    public long getNextPage() {
        if (this.currentPageNum >= getPageCount()) {
            return getPageCount();
        }
        return this.currentPageNum + 1;
    }

    // 上一页
    public long getPrevPage() {
        if (this.currentPageNum <= 1) {
            return 1;
        }
        return this.currentPageNum - 1;
    }
}
