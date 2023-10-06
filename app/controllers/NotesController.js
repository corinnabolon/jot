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
  console.log("active note from appstate", note)
  setHTML("active-note-input", note.ActiveNoteTemplate)
}

export class NotesController {
  constructor() {
    console.log('Notes Controller is loaded', AppState.notes);
    _drawNotes()

    // LISTENERS/OBSERVERS
    AppState.on("notes", _drawNotes)
  }


  createNote(event) {
    try {
      event.preventDefault()

      const form = event.target
      console.log("Testing create note", form)
      const eventData = getFormData(form)
      console.log("this is the event data", eventData)
      notesService.createNote(eventData)
      Pop.success('Note successfully created!')
      form.reset()
      _drawActiveNote()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  saveActiveNote(noteContents) {
    notesService.saveActiveNote(noteContents)
  }

}