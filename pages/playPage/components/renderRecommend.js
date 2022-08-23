import { getElement } from '../../../utils/util.js'
const [reBody] = getElement(['.re-body']);
export default (songId) => {
    fetch(`http://121.40.19.111:3000/simi/song?id=${songId}`)
        .then(res => res.json())
        .then(res => {
            const totalStr = res.songs.reduce((totalStr, item) => {
                const { album: { blurPicUrl, name: albumName }, artists, name: songName, id } = item
                return `${totalStr}<div class="re-item" id='${id}'>
            <img class="re-item-cover" src="${blurPicUrl}">
            <span class="re-item-title">${songName}</span>
            <span class="re-item-pc">${artists.reduce((str, item) => `${str}${item.name}/`, '').slice(0, -1)} - ${albumName}</span>
            <i class="iconfont icon-24gl-playCircle"></i>
        </div>`
            }, '')
            reBody.innerHTML = totalStr
        })
}
