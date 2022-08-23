import { getElement } from '../../../utils/util.js'
const [coBody] = getElement(['.co-body']);
export default (songId) => {
    fetch(`http://121.40.19.111:3000/comment/hot?id=${songId}&type=0`)
        .then(res => res.json())
        .then(res => {
            const totalStr = res.hotComments.reduce((totalStr, item) => {
                const { user:{avatarUrl,nickname},timeStr,likedCount,content} = item
                return `${totalStr}<div class="co-item">
                <div class="coit-header">
                    <img class="coit-avatar" src="${avatarUrl}">
                    <span class="coit-name">${nickname}</span>
                    <span class="coit-time">${timeStr}</span>
                    <span class="coit-countLikes">${(likedCount+'').length>4?(likedCount*1/1000).toFixed(1)+'万':likedCount}</span>
                    <i class="iconfont icon-dianzan"></i>
                </div>
                <div class="coit-body">${content}</div>
            </div>`
            }, '')
            coBody.innerHTML = totalStr
        })
}
