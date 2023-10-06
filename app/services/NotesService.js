import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"


class NotesService {


  setActiveNote(newNote) {
    console.log('[Notes SERVICE] setActiveNote, NewNote:', newNote)
    let activeNoteId = newNote.id
    console.log("Active note id:", activeNoteId)
    let activeNote = AppState.notes.find(note => note.id == activeNoteId)
    console.log("Active note:", activeNote)
    if (activeNote.updatedDate == null) {
      activeNote.updatedDate = activeNote.createdDate
    }
    AppState.activeNote = activeNote
    console.log(activeNote, AppState.activeNote)
  }

  saveActiveNote(noteContents) {
    console.log("Pressed Save Button", noteContents)
    //TODO Update .contents of the active note to match noteContents
  }

  createNote(noteData) {
    const newNote = new Note(noteData)
    console.log('[NOTES SERVICE]createNote, newNote:', newNote)
    AppState.notes.push(newNote)
    console.log(AppState.notes)
    AppState.emit('notes')
    this.setActiveNote(newNote)

  }



}


export const notesService = new NotesService()