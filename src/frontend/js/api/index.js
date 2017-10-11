import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

import {MainPage, EventPage, SchoolPage} from './pseudoserver.js';

promisePolyfill.polyfill();

function testAsync() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json());
}

function mainPage() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    console.log('mainPage async', MainPage)
    return MainPage;
  });
}

function eventPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    console.log('eventPage async', EventPage)
    return EventPage;
  });
}

function schoolPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    console.log('schoolPage async', SchoolPage)
    return SchoolPage;
  });
}

function getSidebarContent() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return response.status;
    }
    return response;
  });
}

function getAdminPage() {
  return fetch('/api/sections').then(response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return response.status;
    }
    return response;
  });
}

function getSectionsList() {
  return fetch('/api/sections').then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function createNewSection(sectionData) {
  console.log(typeof(sectionData), JSON.stringify(sectionData))

  return fetch('/api/section/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sectionData)
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

export default {
  testAsync,
  mainPage,
  eventPage,
  schoolPage,
  getAdminPage,
  getSidebarContent,
  getSectionsList,
  createNewSection
};
