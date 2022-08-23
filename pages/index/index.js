import {getElement} from '../../utils/util.js'
const [topListBody,searchInput]=getElement(['.topList-body','.search-input'])
//渲染topList
fetch('http://121.40.19.111:3000/toplist/detail')
.then(res=>res.json())
.then(res=>{
    const totalStr=res.list.slice(0,4).reduce((totalStr,item)=>{
        const {updateFrequency,coverImgUrl,tracks,id}=item;
        const lis=tracks.reduce((lisStr,liItem,key)=>`${lisStr}<li>${key+1}.${liItem.first}-${liItem.second}</li>`,'')
        return `${totalStr}<div class="topList-item" id="${id}"><span class="topList-update">${updateFrequency}</span><img src=${coverImgUrl}><ol>${lis}</ol></div>`
    },'')
    topListBody.innerHTML=totalStr;
})
//监听focus事件并跳转页面
searchInput.addEventListener('focus',()=>{
    window.location.assign('../search/index.html')
})
//监听歌单得点击事件
topListBody.addEventListener('click',(e)=>{
    let keyNode = e.target;
    while (keyNode.className != 'topList-item') {
        keyNode = keyNode.parentElement;
    }
    window.location.assign(`../playListDetail/index.html?id=${keyNode.getAttribute('id')}`)
})
