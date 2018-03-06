const express = require('express');
const media = require('../../controllers/media');

function createMedia(req, res) {
	let {sectionID, URL,  tags} = req.body;

	media.createNewMedia(sectionID, URL, tags, function(err, media) {
		if (err) res.status(500).send('Что то пошло не так');
		else res.send({data: media._id});
	});
}

function editMedia(req, res) {
	let {sectionID, URL,  tags, mediaID} = req.body;

	media.updateMediaByID(sectionID, URL, tags,  mediaID, function(err, media) {
		if (err) res.status(500).send('Что то пошло не так');
		else res.send({data: media._id});
	});
}

function deleteMedia(req, res) {
	let sectionID = req.params.sectionID;
	let mediaID = req.params.mediaID;

	media.dropMediaByID(sectionID, mediaID, function(error, result) {
		if (error) res.status(500).send('Что то пошло не так');
		else {
			res.send({data: result._id});
		}
	});
}

function getMedia(req, res) {
	let tag = req.params.tag;

	if (tag) media.getMediaByTag(tag, function(error, result) {
		if (error) res.status(500).send('Что то пошло не так');
		else {
			res.send({data: result});
		}
	});
	else media.getAllMedia(function(error, result) {
		if (error) res.status(500).send('Что то пошло не так');
		else {
			res.send({data: result});
		}
	});
}

module.exports = {
	getMedia,
	createMedia,
	editMedia,
	deleteMedia
};
