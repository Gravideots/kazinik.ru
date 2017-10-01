import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

import { MainPage, EventPage, SchoolPage, NotePage, SectionPage } from './pseudoserver.js';

promisePolyfill.polyfill();

function testAsync() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json());
}

function mainPage() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      return MainPage;
    });
}

function eventPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      return EventPage;
    });
}

function schoolPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      return SchoolPage;
    });
}

function notePage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      for(var note in NotePage){
        console.log('NotePage[note]', NotePage[note])
        console.log('id', id)
        if(NotePage[note].Id == id)
         return NotePage[note];
      }
    });
}

function sectionPage(type, tag) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      return SectionPage[type];
    });
}

export default {
  testAsync,
  mainPage,
  eventPage,
  schoolPage,
  notePage,
  sectionPage,
};
