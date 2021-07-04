import './sass/main.scss';
import card from './temp/card.hbs'
import './js/apiService'
import './js/load-more-btn'
import '@pnotify/core/dist/BrightTheme.css';
import apiService from './js/apiService';
const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');

const fetchCardData = new apiService

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.gallery')
}

refs.searchFrom.addEventListner('sumbit', debounce(onSearch, 1000))
refs.searchFrom.addEventListner('click', clearSearchForm)

function onSearch(e) {
    e.preventDefalut()
}