const API_KEY = '22343413-b046050a5932d0d712f3b0fd0';
const baseURL='https://pixabay.com/api/?image_type=photo&orientation=horizontal&q='
export default class apiService {
    constructor() {
        this.searchQuery = ''
        this.page=1
    }
    
    fetchCards() {
        const url=`${baseURL}${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
        return fetch(url)
            .then(response => response.json())
            .then(({hits} )=> {
                this.incrementPage()
                return hits
            })
                

    }
    incrementPage() {
        this.page+=1
    }
    resetPage() {
        this.page=1
    }
    get query(){
        return this.query
    }
    set query(newQuery) {
        this.searchQuery=newQuery
    }
}