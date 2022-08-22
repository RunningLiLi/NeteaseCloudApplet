import { getElement } from '../../../utils/util.js'
const [searchInput, searchProcess, searchOutput] =
    getElement(['.search-input', '#search-process', '#search-output']);
export default() => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event("input"));
    searchProcess.hidden = false;
    searchOutput.hidden = true;
    searchOutput.innerHTML = ''
}