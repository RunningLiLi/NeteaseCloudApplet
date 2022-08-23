import { getElement } from '../../../utils/util.js'
import controlRotate from './controlRotate.js';
const [playPause,audio,recordPoint] = getElement(['#play-pause',"#audio",'.record-point-play']);
export default () => {
    playPause.classList.toggle("icon-zanting");
    playPause.classList.toggle("icon-bofang");
    if(audio.paused){
        audio.play(); 
        recordPoint.classList.remove('record-point-pause');
        controlRotate(true)
    }else{
        audio.pause()
        recordPoint.classList.add('record-point-pause')
        controlRotate(false)
    }
}
