import { getElement } from '../../../utils/util.js'
const [recordCover,playPause] = getElement(['.record-cover','#play-pause']);
let timer=null;
let deg=0;
export default (flag)=>{
    if(flag){
        clearInterval(timer);
        timer=setInterval(() => {
            recordCover.style.transform=`translateX(-50%) rotate(${deg+=1}deg)`
            playPause.style.transform=`translateX(-50%) translateY(-50%) rotate(-${deg++}deg`
        }, 50);
    }
    else{
        clearInterval(timer)
    }
}