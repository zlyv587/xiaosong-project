/**
 * @description:
 * @author: manble@live.com
 * @created: 2019-05-09
 */

const dateTool = {
  format: (timestamp, tpl = 'yyyy-MM-dd hh:mm:ss') => {
    let format = tpl;
    (date => [
      ['y+', date.getFullYear()],
      ['M+', date.getMonth() + 1],
      ['d+', date.getDate()],
      ['h+', date.getHours()],
      ['m+', date.getMinutes()],
      ['s+', date.getSeconds()],
      ['S+', date.getMilliseconds()],
      ['q+', Math.floor((date.getMonth() + 3) / 3)],
    ])(new Date(window.parseInt(timestamp) || 0)).forEach((item, idx) => {
      format = format.replace(new RegExp(item[0]), match => {
        let val = String(item[1]);
        !idx && (val = val.substr(val.length - match.length));
        match.length > val.length && (val = `0${val}`);
        return val;
      });
    });
    return format;
  },
  time: (milliseconds, format = 'hh:mm:ss') => {
    let hour;
    let min;
    let sec;
    let ms = milliseconds;
    hour = window.parseInt(ms / (60 * 60 * 1000));
    ms %= 60 * 60 * 1000;
    min = window.parseInt(ms / (60 * 1000));
    ms %= 60 * 1000;
    sec = Math.floor(ms / 1000);
    hour < 10 && (hour = `0${hour}`);
    min < 10 && (min = `0${min}`);
    sec < 10 && (sec = `0${sec}`);

    return format
      .replace('hh', hour)
      .replace('mm', min)
      .replace('ss', sec);
  },
};

export default dateTool;
