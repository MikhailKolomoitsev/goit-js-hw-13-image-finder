import './sass/main.scss';
import CardsApiService from './js/apiService';
import cardTemplate from './temp/cardTemplate.hbs'

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  cardsList: document.querySelector('.gallery'),
  listItem: document.querySelector('.gallery-item'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]')
}
const cardsApiService=new CardsApiService

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
  e.preventDefault();
   

  cardsApiService.query = e.currentTarget.elements.query.value
  clearCardsContainer()
  cardsApiService.resetPage()
  cardsApiService.fetchCards().then(hits=>appendCardsMarkup(hits))
}

function onLoadMore() {
  cardsApiService.fetchCards().then(hits=>appendCardsMarkup(hits))
}

function appendCardsMarkup(hits) {
  refs.cardsList.insertAdjacentHTML('beforeend', cardTemplate(hits))
}

function clearCardsContainer() {
  refs.cardsList.innerHTML=''
}