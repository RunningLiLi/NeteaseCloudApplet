import {getElement,throttle} from '../../../utils/util.js'
const [akBody]=getElement(['.ak-body'])
function renderAK(keyword){
    fetch(`http://121.40.19.111:3000/search/suggest?keywords=${keyword}`)
    .then(res=>res.json())
    .then(res=>{
        const totalStr=res.result.songs.reduce((totalStr,item,key)=>{
            const {name}=item;
            return `${totalStr}<div class="ak-item" keyword='${name}'>
            <i class="iconfont icon-31sousuo"></i>
            <span class="item-name">${name}</span>
        </div>` 
        },'')
        akBody.innerHTML=totalStr;
    })
    .catch(()=>{
        akBody.innerHTML="没有找到！";
    })
}
export default throttle(renderAK,100)