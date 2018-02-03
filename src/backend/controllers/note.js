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
	let Note = new NoteSchema(JSON.parse(note));
	Note.Active = true;
	Note.Date = new Date();
	Note.Id = slugify(Note.Title);

	await Promise.all(noteFiles.map(async (file) => {
		if (file.fieldname === 'TitleImage') Note.TitleImage.Full = await storeImage(file);
		else Note.Note[file.fieldname] = { Image: await storeImage(file)};
	}));

	return await Section.findOneAndUpdate({ Type: 'Notes' }, { $push: { Listing: Note } }).exec();
};

const getAllNotes = function(done) {
	Section
		.findOne({ Type: 'Notes' }, function(err, section) {
			if (err) throw err;
			else {
				let note = section;
				return done(null, note);
			}
		});
};

const getNoteByID = function(noteID, done) {
	Section
		.findOne({ Type: 'Notes' }, function(err, section) {
			if (err) throw err;
			else {
				let note = section.Listing.find((el, key) => {
					if (el.Id == noteID) return el;
				});

				done(null, note);
			}
		});
};

const dropNoteByID = function(sectionID, noteID, done) {
	Section
		.findOne({ _id: sectionID }, function(err, section) {
			if (err) throw err;
			else {
				section.Listing.Notes.id(noteID).remove();
				section.save();
				return done(null, section);
			}
		});
};

const updateNoteByID = function(sectionID, noteID, data, done) {
	Section
		.findOne({ _id: sectionID }, function(err, section) {
			if (err) throw err;
			else {
				var note = section.Listing.Notes.id(noteID);
				note.Title = data;
				section.save();
				return done(null, note);
			}
		});
};

module.exports = { createNote, getAllNotes, getNoteByID, updateNoteByID, dropNoteByID };
