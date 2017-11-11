import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

import {
  MainPage,
  EventPage,
  SchoolPage,
  NotePage,
  SectionPage,
  GuestRoom
} from './pseudoserver.js';

promisePolyfill.polyfill();

var API = 'local';

let apiPrefix = (API === 'local')? '' : "https://mighty-ravine-31476.herokuapp.com";

function testAsync() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json());
}

function mainPage() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    return MainPage;
  });
}

function eventPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    return EventPage;
  });
}

function schoolPage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    return SchoolPage;
  });
}

function notePage(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    for (var note in NotePage) {
      if (NotePage[note].Id == id) 
        return NotePage[note];
      }
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

function sectionPage(type, tag = null) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    var listing = [];
    if (tag !== null) {
      return SectionPage[tag];
    } else 
      return SectionPage[type];
    }
  );
}

function getAdminPage() {
  return fetch( apiPrefix + '/api/sections/possible', {mode: 'no-cors',}).then(response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return response.status;
    }
    return response;
  });
}

function getSectionsList(param) {
  return fetch( apiPrefix + '/api/sections/' + param, {mode: 'no-cors',}).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}
function createNewSection(sectionData) {
  return fetch( apiPrefix + '/api/section/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify(sectionData)
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}
function getSection(sectionID) {
  return fetch( apiPrefix + '/api/section/' + sectionID, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}
function deleteSection(sectionID) {
  return fetch( apiPrefix + '/api/section/' + sectionID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function updateSection(sectionData) {
  return fetch( apiPrefix + '/api/section/' + sectionData.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify(sectionData)
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function addMedia(mediaData) {
  return fetch( apiPrefix + '/api/media/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify(mediaData)
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function deleteMedia(sectionID, mediaID) {
  return fetch( apiPrefix + '/api/media/' + sectionID + '/' + mediaID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function sendGuestMessage(message){
  return fetch( apiPrefix + '/api/guest/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
    body: JSON.stringify(message)
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    return json
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}


function getGuestRoom() {
  return fetch( apiPrefix + '/api/guest/',{mode: 'no-cors',})
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    return json
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

export default {
  testAsync,
  mainPage,
  eventPage,
  schoolPage,
  notePage,
  sectionPage,
  getGuestRoom,
  getAdminPage,
  getSidebarContent,

  getSectionsList,
  getSection,
  createNewSection,
  deleteSection,
  updateSection,

  sendGuestMessage,

  addMedia,
  deleteMedia
};
