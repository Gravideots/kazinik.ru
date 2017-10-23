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

function getGuestRoom(param) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    console.log(GuestRoom)
    return GuestRoom;
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
  return fetch('/api/section/', {
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
function getSection(sectionID) {
  return fetch('/api/section/' + sectionID, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}
function deleteSection(sectionID) {
  return fetch('/api/section/' + sectionID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}
function updateSection(sectionData) {
  return fetch('/api/section/' + sectionData.id, {
    method: 'PUT',
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

function addMedia(mediaData) {
  return fetch('/api/media/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mediaData)
  }).then(response => {
    if (response.status !== 200) {
      return response.status;
    }
    return response;
  })
}

function deleteMedia(sectionID, mediaID) {
  return fetch('/api/media/' + sectionID + '/' + mediaID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
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
  sectionPage,
  getGuestRoom,
  getAdminPage,
  getSidebarContent,

  getSectionsList,
  getSection,
  createNewSection,
  deleteSection,
  updateSection,

  addMedia,
  deleteMedia
};
