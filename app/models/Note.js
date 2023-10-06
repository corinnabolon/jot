import { generateId } from "../utils/GenerateId.js"

export class Note {

  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.content = data.content || ""
    this.color = data.color || "#FF0000"
    this.createdDate = data.createdDate ? new Date(data.createdDate) : new Date()
    this.updatedDate = data.updatedDate ? new Date(data.updatedDate) : new Date()
    this.wordCount = this.content.length > 0 ? this.content.split(' ').length : 0
    //if the content length is greater than zero, do the calculation, otherwise make the length 0
    this.characterCount = this.content.length
  }

  get NoteCardsTemplate() {
    return `
    <p onclick="app.NotesController.setActiveNote('${this.id}')" role="button"><i class="mdi mdi-pen" style="color: ${this.color}"></i>${this.title}</button>
    `
  }


  get ActiveNoteTemplate() {
    return `         
    <p>Title: ${this.title}</p>
    <p>Created at: ${this.createdDate.toLocaleString()}</p>
    <p>Updated at: ${this.updatedDate.toLocaleString()}</p>
    <div class="d-flex justify-content-between">
    <div id="word-count">
      <p>Words: <span>${this.wordCount}</span></p>
      <p>Characters: <span>${this.characterCount}</span></p>
    </div>
    <button onclick="app.NotesController.saveActiveNote()" class="btn save-button" style="background-color: ${this.color}")>Save</button>
    </div>
    </div>
    <div>
      <textarea id="note-content" class="bg-dark text-light rounded fs-5 textbox-border" style="border-color: ${this.color};">${this.content}</textarea>
    </div>
    <div class="d-flex justify-content-center">
    <button onclick="app.NotesController.removeNote('${this.id}')" class="btn btn-danger">Delete Note</button>
    </div>
  `
  }


}