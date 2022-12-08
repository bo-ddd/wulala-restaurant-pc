export function parsrAsssetFile(url: string): string {
     return new URL(`/src/assets/images/${url}`, import.meta.url).href;
};
export const getTime = (time:any) => {
     let d = new Date(time);
     let year = d.getFullYear();
     let month = d.getMonth() + 1;
     let date: any = d.getDate();
     date = date > 9 ? date : "0" + date;
     let hours: any = d.getHours();
     hours = hours > 9 ? hours : "0" + hours;
     let day = ["七", "一", "二", "三", "四", "五", "六"][d.getDay()];
     let minutes: any = d.getMinutes();
     minutes = minutes > 9 ? minutes : "0" + minutes;
     let seconds: any = d.getSeconds();
     seconds = seconds > 9 ? seconds : "0" + seconds;
     return (year + "年" + month + "月" + date + "日" + "  星期" + day + "  " + hours + ":" + minutes + ":" + seconds)
}
//工具类，一般情况下，只能存在一些没有业务逻辑，在任何页面都可以使用的方法
export default function () {
     return { parsrAsssetFile, getTime }
}