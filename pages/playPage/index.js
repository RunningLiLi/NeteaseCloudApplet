import { getElement } from '../../utils/util.js'
const [title,cover] =
getElement(['#title','.cover']);

fetch(`http://121.40.19.111:3000/song/detail?ids=${window.location.search.replace(/\?songId=/,'')}`)
.then(res=>res.json())
.then(res=>{
    console.log(res)
    title.innerHTML=res.songs[0].al.name;
    cover.src=res.songs[0].al.picUrl;
})
