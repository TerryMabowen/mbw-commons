layui.define('layer', function(exports) {
    /**
     * 获取本周、本季度、本月、上月的开始日期、结束日期
     */
    var layer = layui.layer;

    //当前日期
    var now = new Date();
    //今天本周的第几天
    var nowDayOfWeek = now.getDay();
    //当前日
    var nowDay = now.getDate();
    //当前月
    var nowMonth = now.getMonth();
    //当前年
    var nowYear = now.getFullYear();

    //上月
    let lastMonthDate = new Date();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    var lastMonth = lastMonthDate.getMonth();

    //格式化日期：yyyy-MM-dd
    function formatDate(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth() + 1;
        let myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }

    //将yyyy-MM-dd HH:mm:ss格式的字符串转换成Date类型
    function parseStrDate(strDate) {
        if (strDate !== '') {
            strDate += ' GMT+8';
            return new Date(strDate);
        } else {
            layer.msg('传入的字符串日期不能为空字符串');
        }
    }

    //比较两个时间的前后，返回true表示date1>date2, 返回false表示date1<=date2
    function compareToDate(date1, date2) {
        if (typeof date1 == "string") {
            date1 = parseStrDate(date1);
        }
        if (typeof date2 == "string") {
            date2 = parseStrDate(date2);
        }
        return date1.getTime() > date2.getTime();
    }

    //获得当前日期字符串
    function getNowDate() {
        return formatDate(now);
    }

    //获得某月的天数
    function getMonthDays(myMonth) {
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    }

    //获得本季度的开始月份
    function getQuarterStartMonth() {
        let quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    }

    //获得本周的开始日期
    function getWeekStartDate() {
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        return formatDate(weekStartDate);
    }

    //获得本周的结束日期
    function getWeekEndDate() {
        let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
        return formatDate(weekEndDate);
    }

    //获得上周的开始日期
    function getLastWeekStartDate() {
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
        return formatDate(weekStartDate);
    }

    //获得上周的结束日期
    function getLastWeekEndDate() {
        let weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
        return formatDate(weekEndDate);
    }

    //获得本月的开始日期
    function getMonthStartDate() {
        let monthStartDate = new Date(nowYear, nowMonth, 1);
        return formatDate(monthStartDate);
    }

    //获得本月的结束日期
    function getMonthEndDate() {
        let monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
        return formatDate(monthEndDate);
    }

    //获得上月开始时间
    function getLastMonthStartDate() {
        let lastMonthStartDate = new Date(nowYear, lastMonth, 1);
        return formatDate(lastMonthStartDate);
    }

    //获得上月结束时间
    function getLastMonthEndDate() {
        let lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
        return formatDate(lastMonthEndDate);
    }

    //获得本季度的开始日期
    function getQuarterStartDate() {
        let quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
        return formatDate(quarterStartDate);
    }

    //获得本季度的结束日期
    function getQuarterEndDate() {
        let quarterEndMonth = getQuarterStartMonth() + 2;
        let quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
        return formatDate(quarterStartDate);
    }

    //获得本年的开始时间
    function getYearStartDate() {
        let currentYearStartDate = new Date(nowYear, 0, 1);
        return formatDate(currentYearStartDate);
    }

    //获得本年的结束时间
    function getYearEndDate() {
        let currentYearEndDate = new Date(nowYear, 11, 31);
        return formatDate(currentYearEndDate);
    }

    var datekit = {
        getNowDate: getNowDate,
        getWeekStartDate: getWeekStartDate,
        getWeekEndDate: getWeekEndDate,
        getLastWeekStartDate: getLastWeekStartDate,
        getLastWeekEndDate: getLastWeekEndDate,
        getMonthStartDate: getMonthStartDate,
        getMonthEndDate: getMonthEndDate,
        getLastMonthStartDate: getLastMonthStartDate,
        getLastMonthEndDate: getLastMonthEndDate,
        getQuarterStartDate: getQuarterStartDate,
        getQuarterEndDate: getQuarterEndDate,
        getYearStartDate: getYearStartDate,
        getYearEndDate: getYearEndDate,
        compareToDate: compareToDate
    };

    exports("datekit", datekit);
});