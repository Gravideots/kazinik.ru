const express = require('express')
const media = require('../../controllers/media')

function createMedia(req, res) {

    let {sectionID, URL,  tags} = req.body
    
    media.createNewMedia(sectionID, URL, tags, function (err, media) {
        if (err) 
            res.status(500).send('Что то пошло не так')
        else 
            res.send({data: media._id})
    })
}

function deleteMedia(req, res) {

    let sectionID = req.params.sectionID,
        mediaID = req.params.mediaID

    media.dropMediaByID(sectionID, mediaID, function (error, result) {
        if (error) 
            res.status(500).send('Что то пошло не так')
        else {
            res.send({data: result._id})
        }

    })
}

module.exports = {
    createMedia,
    deleteMedia
}