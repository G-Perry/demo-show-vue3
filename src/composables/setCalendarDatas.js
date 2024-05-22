export function setCalendarDatas() {
  let date = new Date();
  // let calendarRowCount = ref(5);
  let nowYear = ref(date.getFullYear()); //当前年
  let nowMonth = ref(date.getMonth() + 1); //当前月,（0–11），0 表示一年中的第一月。
  // let nowDay = ref(date.getDay()); //当前星期几，一周中的第几天（0-6），0 表示星期天。
  let nowDate = ref(date.getDate()); //当前日期，（1-31）
  let dateList = ref([]);
  let calendarRowClass = ref(""); //用于判断渲染几行
  let calendarRowClassMap = {
    4: "four_rows",
    5: "five_rows",
    6: "six_rows",
  };

  function setDateList(year, month) {
    // 首先置空
    dateList.value = [];
    let calendarRowCount = 5;
    let isThisMonth = false; //用于标识是否为本月
    let Month = month; //日期所在月份
    let prevMonthLastDay = new Date(year, month - 1, 0); //上个月最后一天
    let thisMonthLastDay = new Date(year, month, 0); //这个月最后一天
    let prevMonthDaysCount = prevMonthLastDay.getDate(); //上个月最后一天日期,即上个月天数
    let prevMonthLastDayIndexInWeek = prevMonthLastDay.getDay(); //上个月最后一天在一星期中的的排序（0-6）
    let thisMonthDaysCount = thisMonthLastDay.getDate(); //这个月最后一天日期,即这个月天数
    // 判断日历为四行五行还是六行
    if (
      prevMonthLastDayIndexInWeek < 6 &&
      prevMonthLastDayIndexInWeek + thisMonthDaysCount > 34
    ) {
      calendarRowCount = 6;
    }
    if (prevMonthLastDayIndexInWeek == 6 && thisMonthDaysCount == 28) {
      calendarRowCount = 4;
    }
    // 先向数组插入上月的日期信息
    for (let i = 0; i < prevMonthLastDayIndexInWeek + 1; i++) {
      if (prevMonthLastDayIndexInWeek == 6) break;
      dateList.value.unshift({
        key: `${year}-${Month - 1}-${prevMonthDaysCount - i}`,
        month: Month - 1,
        date: prevMonthDaysCount - i,
        // indexInWeek: prevMonthLastDayIndexInWeek - i,
        isThisMonth: isThisMonth,
        position_row: 1,
        position_column: prevMonthLastDayIndexInWeek - i + 1,
      });
    }
    isThisMonth = true;
    // 再向数组插入本月及下个月的日期信息
    for (
      let i = 0;
      i < calendarRowCount * 7 - ((prevMonthLastDayIndexInWeek + 1) % 7);
      i++
    ) {
      let thisDate = (i + 1) % thisMonthDaysCount;
      if (thisDate == 0) {
        thisDate = thisMonthDaysCount;
      }
      // let indexInWeek = (i + prevMonthLastDayIndexInWeek) % 6;
      dateList.value.push({
        key: `${year}-${Month}-${thisDate}`,
        month: Month,
        date: thisDate,
        // indexInWeek: indexInWeek,
        isThisMonth: isThisMonth,
        position_row: Math.ceil((prevMonthLastDayIndexInWeek + 2 + i) / 7),
        position_column: ((i + 1 + prevMonthLastDayIndexInWeek) % 7) + 1,
      });
      if (thisDate == thisMonthDaysCount) {
        Month++;
        isThisMonth = false;
      }
    }

    calendarRowClass.value = calendarRowClassMap[calendarRowCount];
    // console.log(dateList._rawValue);
  }

  let tasks = ref([
    {
      date: "2024-5-1",
      tasks: [
        {
          id: 1,
          type: "warning", //  warning  danger  primary   info
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
      ],
    },
    {
      date: "2024-6-10",
      tasks: [
        {
          id: 1,
          type: "warning", //  warning  danger  info
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
        {
          id: 2,
          type: "info",
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
        {
          id: 3,
          type: "danger",
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
        {
          id: 4,
          type: "danger",
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
      ],
    },
    {
      date: "2024-5-15",
      tasks: [
        {
          id: 1,
          type: "danger", //  warning  danger  primary   info
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
        {
          id: 2,
          type: "info",
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
        {
          id: 3,
          type: "warning",
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
      ],
    },
    {
      date: "2024-5-27",
      tasks: [
        {
          id: 1,
          type: "info", //  warning  danger  primary   info
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
        {
          id: 2,
          type: "info",
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
      ],
    },
    {
      date: "2024-7-27",
      tasks: [
        {
          id: 1,
          type: "warning", //  warning  danger  primary   info
          desc: "abdcefghijklmnopqrstuvwxyz",
        },
      ],
    },
  ]);

  setDateList(nowYear.value, nowMonth.value);
  return {
    calendarRowClass,
    nowYear,
    nowMonth,
    nowDate,
    dateList,
    tasks,
    setDateList,
  };
}
