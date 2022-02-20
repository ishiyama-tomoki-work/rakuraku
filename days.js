/**
 * 楽々入力精算
 * @author Tom Ishiyama
 * @version 1.0.1
 */

var holiday_jp = require("@holiday-jp/holiday_jp");
const { installConsoleHandler } = require("selenium-webdriver/lib/logging");
fs = require("fs");

class Days {
  day;
  year;
  month;
  date;
  dayOfWeek;
  dayOfWeekStr;
  lastDate;

  constructor(month = 0) {
    this.day = new Date();
    this.year = this.day.getFullYear();
    this.month = this.day.getMonth() + month;
    this.date = this.day.getDate();
    this.dayOfWeek = this.day.getDay(); // 曜日(数値)
    this.dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][
      this.dayOfWeek
    ]; // 曜日(日本語表記)
    this.lastDate = new Date(this.year, this.month + 1, 0);
  }

  isWeekEnd = (day) => {
    const dayOfWeek = day.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    console.log("day of week :", dayOfWeek, dayOfWeekStr);
    // console.log(dayOfWeek + " : " + dayOfWeekStr);
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      //土日の場合
      return true;
    }
    return false;
  };

  /**
   *
   * @param {Date} day
   * @returns {string} yyyy/MM/dd形式で返却
   */
  getYMD = (day) => {
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();
    return `${year}/${month}/${date}`;
  };

  /**
   * 日付がその月の最終日であるか判定
   * True -> 月最終日
   * false -> 月最終日ではない
   * @param {*} day
   * @returns {boolean}
   */
  checkEndMonth = (day) => {
    return this.getYMD(day) == this.getYMD(this.lastDate) ? true : false;
  };

  printDay = (day) => {
    console.log(this.getYMD(day));
  };

  getDays = (num = 0) => {
    const result = [];

    const begin = new Date(this.year, this.month, 1); //月初の日付
    const end = this.lastDate; //月末の日付
    // 〜31日繰り返す
    for (let date = begin; date <= end; date.setDate(date.getDate() + 1)) {
      let inputDay = date;
      this.printDay(inputDay);

      if (holiday_jp.isHoliday(inputDay)) {
        console.log("is holiday");
        continue;
      }

      if (this.isWeekEnd(inputDay)) {
        continue;
      }

      result.push(this.getYMD(inputDay));
    }

    return result;
  };
}
// get a command line variable
// if it does not exist, set default value '0'
// TODO: 入力パラメータを設定ファイルから動的に設定？
const targetMonth = +process.argv[2] || 0;
const fare = 250; // 金額/km
const from = ""; // 出発
const to = ""; // 到着
const roundtrip = "--"; // 片道/往復/--
const bill = "なし"; // なし/あり 客先請求
const reason = "在宅チャージ"; // 申請理由
const transportation = "--"; // 交通機関
const remarks = ""; // 備考

const days = new Days(targetMonth);
const daysResult = days.getDays();

const fileName = "days" + (days.month + 1) + ".csv";
console.log("file name : " + fileName);

let init = "日付,出発,到着,往復,金額/Km,客先請求,申請理由,交通機関,備考\n";
const outData = daysResult.reduce(
  (accumulator, current, index) => {
    const line = `${current},${from},${to},${roundtrip},${fare},${bill},${reason},${transportation},\n`;
    return accumulator + line;
  },
  [init]
);
console.log("outData: ");
console.log(outData);

try {
  fs.writeFileSync(fileName, outData);
  console.log("write end");
} catch (e) {
  console.log(e);
}
