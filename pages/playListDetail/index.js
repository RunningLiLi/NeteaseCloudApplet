import { getElement } from '../../utils/util.js'
import renderHeader from './components/renderHeader.js';
import renderSongList from './components/renderSongList.js';
const [detailBody] = getElement(['.detail-body']);
let songList=[];
const songId = window.location.search.replace(/\?id=/, '');
const [back,home]=getElement(['#back','#home']);
back.addEventListener('click',()=>{
    window.history.go(-1)
})
home.addEventListener('click',()=>{
    window.location.replace('../index/index.html')
})
//渲染头部
fetch(`http://121.40.19.111:3000/playlist/detail?id=${songId}`)
.then(res => res.json())
.then(res => {
    renderHeader(res);
    songList=res.playlist.tracks;
    renderSongList(res.playlist.tracks);//一次渲染10首
})
//根据滚动渲染歌曲列表
document.addEventListener('scroll',()=>{
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    let viewHight= document.documentElement.clientHeight
    if(scrollHeight-window.pageYOffset-viewHight<200 && songList.length!=document.querySelectorAll('.detail-item').length){
        renderSongList(songList);
    }
})
//给歌曲列表添加委托
detailBody.addEventListener('click',(e)=>{
    let keyNode = e.target;
    while (keyNode.className != 'detail-item') {
        keyNode = keyNode.parentElement;
    }
    const id=keyNode.getAttribute('id');
    window.location.assign(`../playPage/index.html?songId=${id}`)

})