import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

import { MainPage, EventPage } from './pseudoserver.js';

promisePolyfill.polyfill();

function testAsync() {
  return fetch('http://date.jsontest.com/')
    .then(response => response.json());
}

function mainPage() {
  return fetch('http://date.jsontest.com/')
    .then(response => {
      console.log('mainPage async', MainPage)
      return MainPage;
    });
}

function eventPage(id) {
  return fetch('http://date.jsontest.com/')
    .then(response => {
      console.log('eventPage async', EventPage)
      return EventPage;
    });
}

export default {
  testAsync,
  mainPage,
  eventPage
};
