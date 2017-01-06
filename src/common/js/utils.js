/**
 * Created by jhh on 2017/1/4.
 */

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return object {id:12345,a:b}
 */
export function urlParse() {
  // ?id=12345&a=b
  let url = window.location.search;

  let obj={};
  let reg = /[?&][^?&]+=[^?&]+/g;

  //[?id=12345,&a=b]
  let arr = url.match(reg);
  if (arr){
    arr.forEach((item)=>{
      //[id,12345]
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }

  return obj;
}
