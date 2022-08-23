import { getElement } from '../../../utils/util.js'
const [reBody] = getElement(['.re-body']);
export default ()=>{
    reBody.addEventListener('click', (e) => {
        console.log(e);
        let keyNode = e.target;
        while (keyNode.className != 're-item') {
            keyNode = keyNode.parentElement;
        }
        
    })
}