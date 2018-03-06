const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { transliterate, slugify } = require('transliteration');


const NoteSchema = require('../schemas/note');
const Section = require('../schemas/section');

const createHashFromName = (name) => crypto.createHash('md5')
	.update(name, 'utf8')
	.digest('hex');

const saveFile = ({ file, type, name }) => new Promise((resolve, reject) => {
	let filePath = path.join('assets/img/upload/', name + '.' + type.slice(type.indexOf('/') + 1));

	filePath = filePath.replace(/\\/g, '/');

	fs.writeFile(filePath, file, function(err) {
		if (err) reject(err);
		else resolve(filePath);
	});
});

const storeImage = async (file) => {
	let hashName = createHashFromName(file.originalname);

	try {
		return await saveFile({ file: file.buffer, type: file.mimetype, name: hashName });
	} catch (e) {
		throw new Error(e);
	}
};

const createNote = async ({ note }, noteFiles, done) => {
	var noteSchema = mongoose.model('Notes', NoteSchema);
	let Note = new noteSchema(JSON.parse(note));
	Note.Active = true;
	Note.Date = new Date();
	Note.Id = slugify(Note.Title);

	await Promise.all(noteFiles.map(async (file) => {
		if (file.fieldname === 'TitleImage') Note.TitleImage.Full = await storeImage(file);
		else Note.Note[file.fieldname] = { Image: await storeImage(file)};
	}));

	return await Section.findOneAndUpdate({ Type: 'Notes' }, { $push: { 'Listing.Notes': Note } }).exec();
};

const getAllNotes = function(done) {
	Section
		.findOne({ Type: 'Notes' }, function(err, section) {
			if (err) throw err;
			else {
				return done(null, section);
			}
		});
};

const getNoteByID = function(noteID, done) {
	Section
		.findOne({ Type: 'Notes' }, function(err, section) {
			if (err) throw err;
			else {
				let note = section.Listing.Notes.find((el, key) => {
					if (el.Id == noteID) return el;
				});

				done(null, note);
			}
		});
};

const dropNoteByID = function(sectionID, noteID, done) {
	var idObject = mongoose.Types.ObjectId(noteID);
	Section
		.findOne({ Type: 'Notes' }, function(err, section) {
			if (err) throw err;
			else {
				section.Listing.Notes.id(idObject).remove();
				section.save();
				return done(null, section);
			}
		});
};

const updateNoteByID = function(sectionID, noteID, data, done) {
	var idObject = mongoose.Types.ObjectId(noteID);
	Section
		.findOne({ Type: 'Notes' }, function(err, section) {
			if (err) throw err;
			else {
				var note = section.Listing.Notes.id(idObject);
				note.Title = data;
				section.save();
				return done(null, note);
			}
		});
};

module.exports = { createNote, getAllNotes, getNoteByID, updateNoteByID, dropNoteByID };
