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

let apiPrefix = (API === 'local') ? '' : 'https://mighty-ravine-31476.herokuapp.com';


function getToken() {
	return localStorage.getItem('userToken');
}

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

function getSidebarContent() {
	return mainPage();
}


function notePage(id) {
	// return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
	//   for (var note in NotePage) {
	//     if (NotePage[note].Id == id)
	//       return NotePage[note];
	//     }
	//   });

	return fetch(apiPrefix + '/api/note/' + id, {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'multipart/form-data'
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}


function sectionPage(type, tag = null) {
	return fetch(apiPrefix + '/api/' + type.toLowerCase() + '/' + (tag || ''), {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'multipart/form-data'
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	// return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
	//   var listing = [];
	//   if (tag !== null) {
	//     return SectionPage[tag];
	//   } else
	//     return SectionPage[type];
	//   }
	// );
}

function getNavigationList() {
	return fetch(apiPrefix + '/api/guest/', {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'multipart/form-data'
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return MainPage.sectionsBlock;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}

function sendGuestMessage(message) {
	return fetch(apiPrefix + '/api/guest/', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		},
		body: JSON.stringify(message)
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}


function getGuestRoom() {
	return fetch(apiPrefix + '/api/guest/', {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'multipart/form-data'
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}

// AUTHENTICATE

function authenticate(payload) {
	return fetch(apiPrefix + '/api/login', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}

//= ===============================================
//= ===============START ADMIN PAGE================
//= ===============================================

function getUsersList() {
	return fetch(apiPrefix + '/admin/api/users', {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: getToken()
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}


function deleteMedia(sectionID, mediaID, tags) {
	console.log(tags);
	return fetch(apiPrefix + '/admin/api/media/' + sectionID + '/' + mediaID, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		}
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}


function addMedia(mediaData) {
	return fetch(apiPrefix + '/admin/api/media/', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		},
		body: JSON.stringify(mediaData)
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}


function getAdminPage() {
	return fetch(apiPrefix + '/admin/api/sections/possible', {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}

function getSectionsList(param) {
	return fetch(apiPrefix + '/admin/api/sections/' + param, {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		}
	})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			return json;
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
}

function createNewSection(sectionData) {
	return fetch(apiPrefix + '/admin/api/section/', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		},
		body: JSON.stringify(sectionData)
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}
function getSection(sectionID) {
	if (!sectionID) return false;
	return fetch(apiPrefix + '/admin/api/section/' + sectionID, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		}
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}

function deleteSection(sectionID) {
	return fetch(apiPrefix + '/admin/api/section/' + sectionID, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		}
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}

function updateSection(sectionData) {
	return fetch(apiPrefix + '/admin/api/section/' + sectionData.id, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: getToken()
		},
		body: JSON.stringify(sectionData)
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}

function createNote(note) {
	return fetch(apiPrefix + '/admin/api/note', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: getToken()
		},
		body: note
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		return json;
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});
}

//= =============================================
//= ===============END ADMIN PAGE================
//= =============================================

export default {
	testAsync,
	mainPage,
	eventPage,
	schoolPage,
	notePage,
	sectionPage,

	getNavigationList,
	getGuestRoom,
	getSidebarContent,

	sendGuestMessage,
	authenticate,

	//= ===============================================
	//= ===============START ADMIN PAGE================
	//= ===============================================

	getAdminPage,
	getSectionsList,
	getSection,
	createNewSection,
	deleteSection,
	updateSection,
	addMedia,
	deleteMedia,
	getUsersList,
	createNote

	//= =============================================
	//= ===============END ADMIN PAGE================
	//= =============================================
};
