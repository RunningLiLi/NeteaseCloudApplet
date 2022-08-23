import { getElement } from '../../utils/util.js'
import baseLayoutPlay from './components/baseLayoutPlay.js';
import playPauseTodo from './components/playPauseTodo.js';
import lyricBlock from './components/lyricBlock.js';
import renderRecommend from './components/renderRecommend.js';
import renderCommend from './components/renderCommend.js';
const [playPause,reBody] =getElement(['#play-pause','.re-body']);
const songId = window.location.search.replace(/\?songId=/, '')
const [back,home]=getElement(['#back','#home']);
back.addEventListener('click',()=>{
    window.history.go(-1)
})
home.addEventListener('click',()=>{
    window.location.replace('../index/index.html')
})
//基本布局和音乐播放
baseLayoutPlay(songId,true);
//处理暂停和播放事件
playPause.addEventListener('click',playPauseTodo);
//渲染歌词区
lyricBlock(songId);
//渲染相似音乐
renderRecommend(songId);
//相似音乐区得点击事件
reBody.addEventListener('click', (e) => {
    let keyNode = e.target;
    while (keyNode.className != 're-item') {
        keyNode = keyNode.parentElement;
    }
    const id=keyNode.getAttribute('id')
    baseLayoutPlay(id);
    lyricBlock(id);
    renderRecommend(id);
    window.scrollTo(0,0)
})
//渲染热门评论
renderCommend(songId)