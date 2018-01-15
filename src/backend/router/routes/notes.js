'use strict';

const Note = require('../../controllers/note');

function getNotes ( req, res ){

  Note.getAllNotes( ( err, notes ) => {

    if( err ) throw err.message;

    res.status( 200 ).send( notes );
  });
}

function getNote ( req, res ){

  var id = req.params.id;
  
  Note.getNoteByID( id, ( err, notes ) => {

    if( err ) throw err.message;

    res.status( 200 ).send( notes );
  });
}

function createNote ( req, res ){

  Note.createNote( req.body, ( err, notes ) => {
    
    if( err ) throw err.message;

    res.status( 200 ).send( notes );
  })
}

module.exports = 
{
  getNotes,
  getNote,
  createNote
}