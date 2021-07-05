import './sass/main.scss';
import card from './temp/card.hbs'
import LoadMoreBtn from './js/load-more-btn'
import apiService from './js/apiService';
const { error } = require('@pnotify/core');
import { data } from 'browserslist';
import '@pnotify/core/dist/BrightTheme.css';

var debounce = require('lodash.debounce');
const basicLightbox = require('basiclightbox');
const cardData = new apiService;

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    cardsList: document.querySelector('.gallery'),
    listItem: document.querySelector('.gallery-item')
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true
});

refs.searchForm.addEventListner('sumbit', debounce(onSearch, 1000))
refs.searchForm.addEventListner('click', clearSearchForm)
refs.cardsList.addEventListener('click', onModal);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onModal(e) {
    if (e.target.classList.contains('gallery-item_img')) {
        const item = basicLightbox.create(
            `<img src=${e.target.getAttribute('data-src')} width="800" height="600">`)
        item.show();
        basicLightbox.visible();
    }

}

function onSearch() {
     if (refs.searchForm.value.trim() === '') {
    return;
     }
    
    cardData.searchQuery.value = refs.searchForm.value;
    cardData.fetchRequest().then(img => {
    if (img.hits.length === 0) {
      loadMoreBtn.hide();
      error({
        text: 'No matches',
      });
    } else {
      renderListItem(img);
      loadMoreBtn.show();
    }
    });
}

function renderListItem(data) {
    refs.cardsList.insertAdjacentHTML('beforeend', card(data));
}

function clearSearchForm() {
    refs.searchForm.value = '';
    refs.cardsList.innerHTML = '';
    loadMoreBtn.hide()
    
}