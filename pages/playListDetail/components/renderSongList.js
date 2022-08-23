import { getElement } from '../../../utils/util.js'
const [detailBody] = getElement(['.detail-body']);
let count=1;
export default(res)=>{   
    const totalStr=res.slice((count-1)*10,(count++)*10).reduce((totalStr,item,k)=>{
        return `${totalStr}<div class="detail-item" id='${item.id}'>
                    <span class="it-rank">${k+(count-2)*10+1}</span>
                    <span class="it-songName">${item.name}</span>
                    <span class="it-pc">${item.ar.reduce((str, item) => `${str}${item.name}/`, '').slice(0, -1)}</span>
                    <i class="iconfont icon-24gl-playCircle"></i>
                </div>`
    },'')
    detailBody.insertAdjacentHTML('beforeend',totalStr)
}
