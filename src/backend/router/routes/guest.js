const guest = require('../../controllers/guest')

function createMessage(req, res) {
    
    let message = req.body

    if(message.postId)
        guest.createAnswer(message, function (err, guest) {
            if (err)
                res.status(500).send('Что то пошло не так')
            else
                res.send(guest)
        })
    else
        guest.createQuestion(message, function (err, guest) {
            if (err)
                res.status(500).send('Что то пошло не так')
            else
                res.send(guest)
        })
}

function deleteMessage(req, res) {

}

function getGuestPage(req, res) {
    guest.getPage((err, pageData)=>{
        if (err) 
            res.status(500).send('Что то пошло не так')
        else {
            res.send(pageData)
        }
    })
}

module.exports = {
    createMessage,
    deleteMessage,
    getGuestPage
}