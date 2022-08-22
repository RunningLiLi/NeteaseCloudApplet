import {getElement} from '../../../utils/util.js'
import setLocalStorage from './setLocalStorage.js'
const [searchProcess,searchInput,searchOutput]=
getElement(["#search-process",".search-input",'#search-output'])
export default(keyword)=>{
    fetch(`http://121.40.19.111:3000/search?keywords=${keyword}`)
    .then(res=>res.json())
    .then(res=>{
        searchInput.value=keyword;
        console.log(res)
        searchInput.dispatchEvent(new Event("input"));
        const totalStr=res.result.songs.reduce((totalStr,item)=>{
            const {name,album:{name:albumName},artists,id}=item;
            return `${totalStr}<div class="output-item" songId='${id}'>
            <span class="item-songName">${name}</span>
            <span class="item-pc">${artists.map(v=>v.name).join('/')} - ${albumName}</span>
            <i class="iconfont icon-24gl-playCircle"></i>
        </div>`
        },'')
        searchOutput.hidden=false;
        searchProcess.hidden=true;
        searchOutput.innerHTML=totalStr.replace(new RegExp(keyword,'g'),`<span class='heightLight-keyword'>${keyword}</span>`);
    })
    setLocalStorage(keyword);
}