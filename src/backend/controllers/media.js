const Media = require('../schemas/media')
const Section = require('../controllers/section')

const createNewMedia = function (sectionID, Title, Description, done) {

    let newMedia = new Media()

    newMedia.Title = Title
    newMedia.Tags = [{ URL: 'MEDIA-1', Text: 'MEDIA-TAG-1' }, { URL: 'MEDIA-2', Text: 'MEDIA-TAG-2' }, { URL: 'MEDIA-3', Text: 'MEDIA-TAG-3' }]

    Section.getSectionByID(sectionID, function (err, section) {
        if (err)
            throw err
        else {
            section.update({ $push: { "Listing": newMedia } },
                function (err, numAffected, rawResponse) {
                    if (err)
                        throw err
                    else {
                        newMedia.save(function (err) {
                            if (err)
                                throw err
                            return done(null, newMedia)
                        })
                    }
                })
        }
    })
}

module.exports = { createNewMedia }