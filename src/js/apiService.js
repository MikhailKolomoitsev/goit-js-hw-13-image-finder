const key=22343413-b046050a5932d0d712f3b0fd0
const baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q`

export default class apiService{
    constructor() {
        this.pageNumber = 1
        this.searchQuery=''
    }
    
    async fetchRequest(){
    try {
        let res = await fetch(`${baseUrl}=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${key}`)
        let data = await res.json()
        this.incrementPagesNumber()
        return data
    } catch(e) {
        console.log('error:' e);
    }
    }
    get queryValue() {
        return this.searchQuery;
    }
    set queryValue(value) {
        this.searchQuery = value;
    }
    incrementPagesNumber() {
        this.pageNumber+=1
    }
     resetPagesNumber() {
        this.pageNumber = 1;
    }

}