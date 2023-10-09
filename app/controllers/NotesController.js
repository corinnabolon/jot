import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";
import { setHTML } from "../utils/Writer.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";


function _drawNotes() {
  let notes = AppState.notes
  setHTML("notes-count", `${notes.length} notes on file`)
  let content = ``
  notes.forEach(noteContent => content += noteContent.NoteCardsTemplate)
  setHTML("notes-list", content)
}

function _drawActiveNote() {
  let note = AppState.activeNote
  if (note != null) {
    setHTML("active-note-input", note.ActiveNoteTemplate)
  } else if (AppState.notes.length > 0) {
    setHTML("active-note-input", AppState.notes[0].noteClosedTemplate)
  } else {
    setHTML("active-note-input", "")
  }
}

export class NotesController {
  constructor() {
    _drawNotes()

    // LISTENERS/OBSERVERS
    AppState.on("notes", _drawNotes)
    AppState.on("activeNote", _drawActiveNote)
  }


  createNote(event) {
    try {
      event.preventDefault()

      const form = event.target
      const eventData = getFormData(form)
      notesService.createNote(eventData)
      Pop.success('Note successfully created!')
      form.reset()
      _drawActiveNote()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  saveActiveNote() {
    let noteContent = document.getElementById('note-content').value
    if (noteContent == "") {
      Pop.toast("Your note has no content.")
    } else {
      notesService.saveActiveNote(noteContent)
      Pop.success("Your note has been saved.")
    }
  }

  setActiveNote(noteId) {
    let activeNote = AppState.activeNote
    if (activeNote != null) {
      let noteContent = document.getElementById('note-content').value
      if (noteContent != activeNote.content) {
        this.checkSave(noteId)
      } else {
        notesService.setActiveNote(noteId)
      }
    }
    else {
      notesService.setActiveNote(noteId)
    }
  }

  async checkSave(noteId) {
    let wantsToSave = await Pop.confirmSave("Your changes have not been saved. Would you like to save them?")
    if (wantsToSave) {
      this.saveActiveNote()
      notesService.setActiveNote(noteId)
    } else {
      Pop.success("Your changes were not saved.")
      notesService.setActiveNote(noteId)
    }

  }

  async removeNote(noteId) {
    let wantsToDelete = await Pop.confirm("Are you sure you want to delete this note?")

    if (!wantsToDelete) {
      return
    }
    notesService.removeNote(noteId)
    Pop.success("Your note has been removed.")

  }

  returnToHomeScreen() {
    let note = AppState.activeNote
    setHTML("active-note-input", note.noteClosedTemplate)
  }

}