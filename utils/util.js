export function getElement(cssArr) {
    return cssArr.map(cssStr => document.querySelector(cssStr))
}
export function throttle(fuc, time) {
    let flag = true;
    return (...arg) => {
        if (flag) {
            flag = false;
            setTimeout(() => {
                fuc(...arg);
                flag = true;
            }, time)
        }
    }
}
// export function splicingList(templateSrt, array) {
//     console.log(templateSrt.match(/\${(([\s\S])*?)}/g))
//     templateSrt.match(/\${(([\s\S])*?)}/g).map(str=>{

//     })
//     return array.reduce((totalStr, item, key) => {
//         const template=''
//         templateSrt.match(/\${(([\s\S])*?)}/g).map(slot=>{
//             const reg = new RegExp(slot);
//             template=templateSrt.replace(reg,item)
//         })
//         =templateSrt.replace(/item/g,item);

//         // console.log(template)
//         return `${totalStr}${template}`
//     }, '')
// }