/**
* @description:
* @author: manble@live.com
* @created: 2020-03-30
*/

import dateTool from '@/utils/dateTool';

export default {
  get: key => {
    let data = (window.localStorage && window.localStorage.getItem(key)) || '{ "data": "" }';
    try {
      data = JSON.parse(data);
    } catch (error) { }
    let { expires } = data;
    expires && expires > 0 && new Date().getTime() > expires && (data.data = '');
    return data.data;
  },

  // expires ms 1000 (Date.now() + 1000) 当前时间后多少毫秒内失效
  // expires '2020-04-28 23:59:59' 具体到失效时间
  // expires 不传不设置过期时间
  set: (key, value, expires) => {
    window.localStorage && window.localStorage.setItem(key, JSON.stringify({
      data: value,
      expires: (/[-:]/.test(expires) && dateTool.timestamp(expires)) || (typeof expires === 'number' && expires > 0 && (new Date().getTime() + expires)) || -1
    }));
  },

  del: key => {
    window.localStorage && window.localStorage.removeItem(key);
  }
};
