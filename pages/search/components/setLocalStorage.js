import showHistory from "./showHistory.js";
export default (keyword)=>{
    const historyStr=localStorage.getItem('historyItems')??'';
    const reg=new RegExp(`${keyword}`);
    if(historyStr.match(reg)!=null)return;
    localStorage.setItem('historyItems',historyStr+historyStr==''?keyword:(historyStr+'&'+keyword));
    showHistory()
}