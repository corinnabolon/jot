import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { saveState } from "../utils/Store.js"


function _saveNotes() {
  saveState("notes", AppState.notes)
}

class NotesService {

  saveActiveNote(noteContent) {
    let activeNote = AppState.activeNote
    activeNote.content = noteContent
    activeNote.updatedDate = new Date()
    activeNote.wordCount = activeNote.content.split(' ').length
    activeNote.characterCount = activeNote.content.length
    AppState.emit("activeNote")
    _saveNotes()
  }

  createNote(noteData) {
    const newNote = new Note(noteData)
    AppState.notes.push(newNote)
    AppState.emit('notes')
    let noteId = newNote.id
    this.setActiveNote(noteId)
    _saveNotes()
  }

  setActiveNote(noteId) {
    let activeNote = AppState.notes.find(note => note.id == noteId)
    AppState.activeNote = activeNote
    AppState.emit("activeNote")
  }

  removeNote(noteId) {
    let notes = AppState.notes
    let noteIndex = notes.findIndex(note => note.id == noteId)

    if (noteIndex == -1) {
      throw new Error(`Could not find a note index with this ID: ${noteId}`)
    }
    notes.splice(noteIndex, 1)
    _saveNotes()

    AppState.emit('notes')

    AppState.activeNote = null  //This is so that setActiveNote will work
  }


}


export const notesService = new NotesService()