import {getElement} from '../../../utils/util.js'
import renderAk from '../components/renderAk.js';
const [searchInput,historyBlock,hotSearch,searchClear,akTitle,
    associativeKeyword,searchProcess,searchOutput]=
getElement(['.search-input','.history','.hotSearch','.search-clear','.ak-title',
'.associativeKeyword','#search-process','#search-output']);
export default()=>{
    if(searchInput.value){
        akTitle.innerHTML='搜索'+"\""+searchInput.value+"\"";
        hotSearch.hidden=true;
        historyBlock.hidden=true;
        searchClear.hidden=false;
        associativeKeyword.hidden=false;
        searchOutput.hidden=true;
        renderAk(searchInput.value)//渲染联想关键词
    }
    else{
        searchProcess.hidden=false;
        hotSearch.hidden=false;
        searchClear.hidden=true;
        associativeKeyword.hidden=true; 
        searchOutput.hidden=true
        if(localStorage.getItem('historyItems')){
            historyBlock.hidden=false;
        }  
    }
}