const express = require('express')
const section = require('../../controllers/section')

module.exports = function section(req, res) {
    res.send({sections: "Sections"})
}

function getPossibleSectiosList(req, res) {
    console.log("!!!getPossibleSectiosList")

    res.send({
        PosibleSections: [
            {
                name: 'Интервью',
                type: 'interview'
            }, {
                name: 'Медиа',
                type: 'media'
            }, {
                name: 'События',
                type: 'event'
            }, {
                name: 'Школы',
                type: 'media'
            }, {
                name: 'Гостевая Книга',
                type: 'event'
            }, {
                name: 'Статья',
                type: 'media'
            }, {
                name: 'Школы',
                type: 'media'
            }, {
                name: 'Гостевая Книга',
                type: 'event'
            }, {
                name: 'Статья',
                type: 'media'
            }
        ]
    })
}

function getExistingSectionsList(req, res) {
    console.log("---getExistingSectionsList")
    section.getAllSections(function (err, sections) {
        if (err) 
            console.log('Error! Can not access DB'.error)
        else {
            res.json({ExistingSections: sections})
        }
    })
}

function createNewSection(req, res) {
    let newSection = req.body.sectionData

    section.createNewSection(newSection, function (err, section) {
        if (err) 
            res.status(500).send('Что то пошло не так');
        else 
            res.send({data: 'OK'})
    })

}

module.exports = {
    getExistingSectionsList,
    getPossibleSectiosList,
    createNewSection
}