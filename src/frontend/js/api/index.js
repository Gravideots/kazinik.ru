import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

import { MainPage, EventPage, SchoolPage, NotePage } from './pseudoserver.js';

promisePolyfill.polyfill();

function testAsync() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json());
}

function mainPage() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      console.log('mainPage async', MainPage)
      return MainPage;
    });
}

function eventPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      console.log('eventPage async', EventPage)
      return EventPage;
    });
}

function schoolPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      console.log('schoolPage async', SchoolPage)
      return SchoolPage;
    });
}

function notePage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      console.log('NotePage async', NotePage)
      return NotePage[id];
    });
}

export default {
  testAsync,
  mainPage,
  eventPage,
  schoolPage,
  notePage,
};
