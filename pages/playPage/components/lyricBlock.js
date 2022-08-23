import { getElement, getSecond } from '../../../utils/util.js'
const [audio, lyricUl] =getElement(['#audio', '#lyric-ul']);
let lis=[];
let res={};
let log=0;
let timer=function timeUpdateCallback(){
    const currentTime = audio.currentTime;
    res.some((preTime, k, timeArr) => {
        if (preTime <= currentTime && timeArr[k + 1] > currentTime && log != k) {
            log = k;
            lyricUl.scrollTop = lis[k].offsetTop - 75;
            // lis[k].scrollIntoView({block: "center"});
            // console.log(lis[k].scrollIntoView({block: "center"}))
            // window.scroll({top: lis[k].offsetTop, behavior: 'smooth'});
            // lis[k].scrollTo({
            //     top: 100,
            //     left: 100,
            //     behavior: 'smooth'
            //   });
            lis.forEach(element => {
                element.classList.remove('heightLight')
            });
            lis[k].classList.add('heightLight')
            return true
        }
    })
}
export default (songId) => {
    fetch(`http://121.40.19.111:3000/lyric?id=${songId}`)
        .then(res => res.json())
        .then(res => {
            const TW = res.lrc.lyric.split('\n');
            const timeArr = []
            const totalStr = TW.slice(0, TW.length - 1).reduce((totalStr, item) => {
                if (item.split(']')[1]) {
                    timeArr.push(getSecond(item.split(']')[0]))
                }
                return `${totalStr} ${item.split(']')[1] ? `<li>${item.split(']')[1]}</li>` : ''}`
            }, '')
            lyricUl.innerHTML = totalStr;
            return timeArr
        })
        .then((a) => {
            res=a;
            lis = lyricUl.querySelectorAll('li')
            log = 0;
            audio.removeEventListener('timeupdate',timer);   
            audio.addEventListener('timeupdate',timer)
        })
}