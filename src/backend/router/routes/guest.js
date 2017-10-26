const express = require('express')
const guest = require('../../controllers/media')

function createMessage(req, res) {
    
    let message = req.body

    console.log('messaage', message);
        // guest.createNewPost(, function (err, media) {
        //     if (err)
        //         res.status(500).send('Что то пошло не так')
        //     else
        //         res.send({data: media._id})
        // })
}
    
function deleteMessage(req, res) {

}

function getGuestPage(req, res) {

}

module.exports = {
    createMessage,
    deleteMessage
}