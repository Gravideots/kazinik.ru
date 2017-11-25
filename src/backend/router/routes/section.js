const express = require('express')
const section = require('../../controllers/section')

function getPossibleSectiosList(req, res) {

    let PosibleSections = [
        {
            name: 'Интервью',
            type: 'Interviews',
            description: 'Тестовое описание',
            active: false,
            exists: false,
            id: null
        }, {
            name: 'Статьи',
            type: 'Articles',
            description: 'Тестовое описание',
            active: false,
            exists: false,
            id: null
        }, {
            name: 'Медиа',
            type: 'Media',
            description: 'Тестовое описание',
            active: false,
            exists: false,
            id: null
        }, {
            name: 'События',
            type: 'Events',
            description: 'Тестовое описание',
            active: false,
            exists: false,
            id: null
        }, {
            name: 'Школы',
            type: 'Schools',
            description: 'Тестовое описание',
            active: false,
            exists: false,
            id: null
        }, {
            name: 'Гостевая Книга',
            type: 'GuestBook',
            description: 'Тестовое описание',
            active: false,
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
                            processedSection.description = existingSection.Description
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

    let {sectionData, sectionType } = req.body
    
    section.createNewSection(sectionData, sectionType, function (err, section) {
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

function getSection(req, res) {
    section
        .getSectionByID(req.params.id, function (error, result) {
            if (error) 
                res.status(500).send('Что то пошло не так')
            else 
                res.send({Section: result})
        })
}

function updateSection(req, res) {
    section
        .updateSectionByID(req.params.id, req.body, function (error, result) {
            if (error) 
                res.status(500).send('Что то пошло не так')
            else 
                res.send({Section: result})
        })
}

module.exports = {
    getExistingSectionsList,
    getPossibleSectiosList,
    createNewSection,
    getSection,
    updateSection,
    deleteSection
}