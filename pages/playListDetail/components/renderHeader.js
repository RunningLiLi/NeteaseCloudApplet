import { getElement } from '../../../utils/util.js'
const [detailHeader, totalCount,title] = getElement(['.detail-header', '#totalCount',"#title"]);
export default (res) => {
    const { playlist: { trackCount, coverImgUrl, playCount, name, description, creator: { avatarUrl, nickname } }, } = res;
    totalCount.innerHTML = `(共${trackCount}首)`;
    title.style.background=`url(${coverImgUrl})`;
    detailHeader.innerHTML = `<div class='de-cover-container'>
        <img class='de-cover' src="${coverImgUrl}">
        <i class="iconfont icon-bofangsanjiaoxing">${(playCount + '').slice(0, 2)}亿</i>
        <span class="de-type">${name}</span>
        <div class="de-log"><img class='de-avatar'src="${avatarUrl}" alt="">${nickname} </div><p class="de-intro">${description}</p></div>`
    const styleTag = document.createElement('style');
    const beforeText = document.createTextNode(`.detail-header::before{
            content: '';
            position: absolute;
            display: inline-block;
            width: 100%;
            height: 300px;
            filter: blur(10px);
            background-image: url("${coverImgUrl}");
        }`);
    styleTag.appendChild(beforeText);
    document.body.appendChild(styleTag)
}
