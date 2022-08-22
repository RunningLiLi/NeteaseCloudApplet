import { getElement } from '../../utils/util.js'
import searchByKS from './components/searchByKS.js';
import showHistory from './components/showHistory.js';
import inputTodo from './components/inputTodo.js';
import xTodo from './components/xTodo.js';
const [hotSearchBody, searchInput, historyBlock, searchClear, akBody, clearHistory,searchOutput] =
getElement(['.hotSearch-body', '.search-input', '.history', '.search-clear', ".ak-body", '#clearHistory','#search-output']);
//默认聚焦
searchInput.focus()


//清除所有的历史记录
clearHistory.addEventListener('click', () => {
    localStorage.clear();
    historyBlock.hidden = true
})


//是否显示历史搜索
if (!localStorage.getItem('historyItems')) {
    historyBlock.hidden = true
} else {
    showHistory()
}


//点击×清除input的值
searchClear.addEventListener('click',xTodo)


//监听输入框的回车事件
searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        searchByKS(searchInput.value);
    }
})


//监听历史搜索的点击事件
historyBlock.addEventListener('click',(e)=>{
    if(e.target.className==''){
        searchByKS(e.target.innerHTML);
    }
})


//监听搜索结果的点击事件
searchOutput.addEventListener('click',(e)=>{
    let keyNode = e.target;
    while (keyNode.className != 'output-item') {
        keyNode = keyNode.parentElement;
    }
    window.location.assign(`../playPage/index.html?songId=${keyNode.getAttribute('songId')}`)
})


//监听热搜的点击事件
hotSearchBody.addEventListener('click', (e) => {
    let keyNode = e.target;
    while (keyNode.className != 'hotSearch-item') {
        keyNode = keyNode.parentElement;
    }
    searchByKS(keyNode.getAttribute('keyword'));
})


//监听联想的点击事件
akBody.addEventListener('click', (e) => {
    let keyNode = e.target;
    while (keyNode.className != 'ak-item') {
        keyNode = keyNode.parentElement;
    }
    searchByKS(keyNode.getAttribute('keyword'));
})


//监听input事件决定是否显示热搜和搜索联想
searchInput.addEventListener('input', inputTodo)


//渲染热搜
fetch('http://121.40.19.111:3000/search/hot/detail')
    .then(res => res.json())
    .then(res => {
        const totalStr = res.data.reduce((totalStr, item, key) => {
            const { searchWord, score, iconUrl, content } = item;
            return `${totalStr}<div class="hotSearch-item" keyword='${searchWord}'>
        <span class="item-rank">${key + 1}</span>
        <span class="item-TI">
            <span class="item-title">${searchWord}<img src='${iconUrl}' ${iconUrl ? '' : 'hidden'}></span>
            <span class="item-intro">${content}</span> 
        </span>
        <span class="item-count" >${score}</span>
    </div>`
        }, '')
        hotSearchBody.innerHTML = totalStr;
    })