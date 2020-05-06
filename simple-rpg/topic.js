let topicsArray = [
    "尚未開學",
    "課程簡介",
    "隨機性",
    "隨機性-Lab",
    "重複性",
    "重複性2"
];

let startDate = new Date();

function setMonthAndDay(startMonth, startDay){
    //一次設定好月份與日期
    startDate.setMonth(startMonth-1,startDay);
    //時分秒這個例子不會用到，歸0
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

//給社長用的
setMonthAndDay(3,2);
