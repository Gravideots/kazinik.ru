import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

import { MainPage, EventPage, SchoolPage, NotePage } from './pseudoserver.js';

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

function notePage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      console.log('NotePage async', NotePage)
      return NotePage[id];
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
  return fetch('/api/sections/possible').then(response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return response.status;
    }
    return response;
  });
}

function getSectionsList(param) {
  return fetch('/api/sections/' + param).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function createNewSection(sectionData) {
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

function getAdminPage() {
  return fetch('/api/sections/possible').then(response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return response.status;
    }
    return response;
  });
}

function getSectionsList(param) {
  return fetch('/api/sections/' + param).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function createNewSection(sectionData) {
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
  notePage,
  getAdminPage,
  getSidebarContent,
  getSectionsList,
  createNewSection
};
