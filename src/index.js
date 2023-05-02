import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import imgFetcher from './js/pixabay';
import makeMark from './js/mark';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const loadButtonEl = document.querySelector('.load-more');
const imgFetch = new imgFetcher();
const backdropGallery = new simpleLightbox('.gallery a');

// hideLoadButtonEl();
async function onFormSubmit(event) {
  event.preventDefault();
  clearMark();
  imgFetch.query = event.target.elements.searchQuery.value;
  const data = await imgFetch.getRequest();
  const fullString = makeMark(data);
  insertMark(fullString);
  if (imgFetch.page < imgFetch.totalPage) {
    imgFetch.page += 1;
    showLoadButtonEl();
    backdropGallery.refresh();
  }
}

async function onLoadButtonElClick() {
  hideLoadButtonEl();
  const data = await imgFetch.getRequest();
  const fullString = makeMark(data);
  insertMark(fullString);
  if (imgFetch.page === imgFetch.totalPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  if (imgFetch.page < imgFetch.totalPage) {
    imgFetch.page += 1;
    showLoadButtonEl();
    backdropGallery.refresh();
  }
}

formEl.addEventListener('submit', onFormSubmit);

function insertMark(fullMark) {
  galleryEl.insertAdjacentHTML('beforeend', fullMark);
}

function clearMark() {
  imgFetch.page = 1;
  galleryEl.innerHTML = '';
}

function showLoadButtonEl() {
  loadButtonEl.classList.remove('is-hidden');
  loadButtonEl.addEventListener('click', onLoadButtonElClick);
}

function hideLoadButtonEl() {
  loadButtonEl.classList.add('is-hidden');
  loadButtonEl.removeEventListener('click', onLoadButtonElClick);
}
