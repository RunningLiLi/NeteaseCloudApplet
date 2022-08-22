export default ()=>{
    const historyBox=document.querySelector('.history-box')
    historyBox.innerHTML=
    localStorage.getItem('historyItems').split('&')
    .reduce((totalStr,item)=>`${totalStr}<span>${item}</span>`,'')
    document.querySelector('.history').hidden=false;
}