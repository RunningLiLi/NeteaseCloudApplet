import {getElement} from '../../utils/util.js'
import renderAk from './components/renderAk.js';
const [hotSearchBody,searchInput,historyBlock,hotSearch,searchClear,akTitle,associativeKeyword]=
getElement(['.hotSearch-body','.search-input','.history','.hotSearch','.search-clear','.ak-title','.associativeKeyword']);
//默认聚焦
searchInput.focus()

//是否显示历史搜索
if(!localStorage.getItem('historyKeywords')){
    historyBlock.hidden=true
}
//点击×清除input的值
searchClear.addEventListener('click',()=>{
    searchInput.value='';
    searchInput.dispatchEvent(new Event("input"));
})

//监听input事件决定是否显示热搜和搜索联想
searchInput.addEventListener('input',()=>{
    if(searchInput.value){
        akTitle.innerHTML='搜索'+"\""+searchInput.value+"\"";
        hotSearch.hidden=true;
        historyBlock.hidden=true;
        searchClear.hidden=false;
        associativeKeyword.hidden=false;
        renderAk(searchInput.value)//渲染联想关键词
    }
    else{
        hotSearch.hidden=false;
        searchClear.hidden=true;
        associativeKeyword.hidden=true;
        if(localStorage.getItem('historyKeywords')){
            historyBlock.hidden=false;
        }  
    }
})
//渲染热搜
fetch('http://121.40.19.111:3000/search/hot/detail')
.then(res=>res.json())
.then(res=>{
    const totalStr=res.data.reduce((totalStr,item,key)=>{
        const {searchWord,score,iconUrl,content}=item;
        return `${totalStr}<div class="hotSearch-item">
        <span class="item-rank">${key+1}</span>
        <span class="item-TI">
            <span class="item-title">${searchWord}<img src='${iconUrl}' ${iconUrl?'':'hidden'}></span>
            <span class="item-intro">${content}</span> 
        </span>
        <span class="item-count" >${score}</span>
    </div>`
    },'')
    hotSearchBody.innerHTML=totalStr;
})