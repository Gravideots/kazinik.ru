const express = require('express')
const section = require('../../controllers/section')

module.exports = function section(req, res) {
    res.send({sections: "Sections"})
}

function getPossibleSectiosList(req, res) {

    let PosibleSections = [
        {
            name: 'Интервью',
            type: 'Interviews',
            exists: false,
            id: null
        }, {
            name: 'Статьи',
            type: 'Articles',
            exists: false,
            id: null
        }, {
            name: 'Медиа',
            type: 'Media',
            exists: false,
            id: null
        }, {
            name: 'События',
            type: 'Events',
            exists: false,
            id: null
        }, {
            name: 'Школы',
            type: 'Schools',
            exists: false,
            id: null
        }, {
            name: 'Гостевая Книга',
            type: 'GuestBook',
            exists: false,
            id: null
        }
    ]

    section.getAllSections(function (err, sections) {
        if (err) 
            console.log('Error! Can not access DB'.error)
        else {
            if (sections.length > 0) {
                let processedPosibleSections;
                sections.map(function (existingSection) {
                    processedPosibleSections = PosibleSections.map(function (section) {
                        if (existingSection.Listing[section.type] && existingSection.Listing[section.type].Available) {
                            let processedSection = section
                            processedSection.name = existingSection.Title
                            processedSection.exists = true
                            processedSection.id = existingSection._id
                            return processedSection
                        } else {
                            return section
                        }
                    })
                })
                res.json({PosibleSections: processedPosibleSections})
            } else 
                res.json({PosibleSections: PosibleSections})
        }
    })
}

function getExistingSectionsList(req, res) {
    section
        .getAllSections(function (err, sections) {
            if (err) 
                console.log('Error! Can not access DB'.error)
            else {
                res.json({ExistingSections: sections})
            }
        })
}

function createNewSection(req, res) {

    let newSection = req.body.sectionData
    let newSectionType = req.body.sectionType
    section.createNewSection(newSection, newSectionType, function (err, section) {
        if (err) 
            res.status(500).send('Что то пошло не так')
        else 
            res.send({data: 'OK'})
    })

}

function deleteSection(req, res) {
    section
        .dropSectionByID(req.params.id, function (error, result) {
            if (error) 
                res.status(500).send('Что то пошло не так')
            else 
                res.send({data: 'OK'})
        })
}

module.exports = {
    getExistingSectionsList,
    getPossibleSectiosList,
    createNewSection,
    deleteSection
}