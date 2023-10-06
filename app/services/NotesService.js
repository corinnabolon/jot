import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { saveState } from "../utils/Store.js"


function _saveNotes() {
  saveState("notes", AppState.notes)
}

class NotesService {

  saveActiveNote(noteContent) {
    console.log("NoteServices activated, content:", noteContent)
    let activeNote = AppState.activeNote
    activeNote.content = noteContent
    console.log("active note's content:", activeNote.content, "AppState notes", AppState.notes)
    activeNote.updatedDate = new Date()
    activeNote.wordCount = activeNote.content.split(' ').length
    activeNote.characterCount = activeNote.content.length
    AppState.emit("activeNote")
    console.log("This is the notes array after a note is saved.", AppState.notes)
    _saveNotes()
  }

  createNote(noteData) {
    const newNote = new Note(noteData)
    console.log('[NOTES SERVICE]createNote, newNote:', newNote)
    AppState.notes.push(newNote)
    console.log(AppState.notes)
    AppState.emit('notes')
    let noteId = newNote.id
    this.setActiveNote(noteId)
    _saveNotes()
  }

  setActiveNote(noteId) {
    let activeNote = AppState.notes.find(note => note.id == noteId)
    console.log("Active note:", activeNote)
    AppState.activeNote = activeNote
    console.log(activeNote, AppState.activeNote)
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
  }






}


export const notesService = new NotesService()