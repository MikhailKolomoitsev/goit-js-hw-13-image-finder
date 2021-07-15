import './sass/main.scss';
import CardsApiService from './js/apiService';
import cardTemplate from './temp/cardTemplate.hbs'
import LoadMoreBtn from './js/load-more-btn'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { error } = require('@pnotify/core');
const basicLightbox = require('basiclightbox');

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  cardsList: document.querySelector('.gallery'),
  listItem: document.querySelector('.gallery-item'),
}
const cardsApiService = new CardsApiService;
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true
});
console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch)
loadMoreBtn.refs.button.addEventListener('click', fetchApp)
refs.cardsList.addEventListener('click', openModal)

function openModal(event){
if (event.target.classList.contains('gallery-item_img')) {
    const instance = basicLightbox.create(
      `<img src=${event.target.getAttribute('data-src')} width="800" height="600">`,
    );
    console.log(instance);
    instance.show();
    basicLightbox.visible();
  }
}

function onSearch(e) {
  e.preventDefault();
   

  cardsApiService.query = e.currentTarget.elements.query.value
  clearCardsContainer()
  loadMoreBtn.show()
  cardsApiService.resetPage()
  fetchApp()
}

function onLoadMore() {
 
}

async function fetchApp() {
  loadMoreBtn.disable()
  const hits=await cardsApiService.fetchCards()
    if (hits.length === 0) {
      loadMoreBtn.hide();
      // alert('write something normal')
      error({
        title: 'Error',
        text: 'write something else',
      });
    } else {
      appendCardsMarkup(hits)
      loadMoreBtn.enable();
      btnScrollElem()
    }
  
}

function appendCardsMarkup(hits) {
  refs.cardsList.insertAdjacentHTML('beforeend', cardTemplate(hits))
}

function clearCardsContainer() {
  refs.cardsList.innerHTML=''
}

function btnScrollElem() {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}