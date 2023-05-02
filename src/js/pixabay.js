import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class imgFetcher {
  #BASE_URL = 'https://pixabay.com/api/';
  #KEY = '35986436-8e80a5ced43bef6d9edd36af6';
  constructor() {
    this.query = '';
    this.page = null;
    this.per_page = 21;
    this.totalPage = 1;
  }
  async getRequest() {
    const parametrs = {
      key: this.#KEY,
      page: this.page,
      per_page: this.per_page,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
    const response = await axios.get(this.#BASE_URL, { params: parametrs });

    if (response.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.info(`"Hooray! We found ${response.data.total} images."`);
    }

    this.totalPage = Math.ceil(response.data.total / this.per_page);
    return response.data.hits;
  }
}
