import { getElement } from '../../../utils/util.js'
import controlRotate from './controlRotate.js';
const [title, cover, playPageContainer,audio,realTitle] =
    getElement(['#title', '.cover', '#play-page-container','#audio',"#realTitle"]);
export default (songId) => {
    fetch(`http://121.40.19.111:3000/song/detail?ids=${songId}`)
        .then(res => res.json())
        .then(res => {
            const {picUrl } = res.songs[0].al;
            realTitle.innerHTML = res.songs[0].name;
            cover.src = picUrl;
            playPageContainer.style.backgroundImage = `url(${picUrl})`;
            title.style.backgroundImage = `url(${picUrl})`;
        }).then(() => {
            fetch(`http://121.40.19.111:3000/song/url?id=${songId}`)
                .then(res => res.json())
                .then(res => {
                    audio.src = res.data[0].url;
                    controlRotate(true);
                    audio.addEventListener('ended',()=>{
                        controlRotate(false);
                    })
                })
        })
}
