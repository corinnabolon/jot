import { generateId } from "../utils/GenerateId.js"

export class Note {

  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.content = data.content || ""
    this.color = data.color || "#0802A3"
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
    <p class="fs-3 fw-bold mt-3">Title: ${this.title}</p>
    <p>Created at: ${this.createdDate.toLocaleString()}</p>
    <p>Updated at: ${this.updatedDate.toLocaleString()}</p>
    <div class="d-flex justify-content-between">
    <div id="word-count">
      <p>Words: <span>${this.wordCount}</span></p>
      <p>Characters: <span>${this.characterCount}</span></p>
    </div>
    <button onclick="app.NotesController.saveActiveNote()" class="btn save-button fw-bold" style="background-color: ${this.color}")>Save</button>
    </div>
    </div>
    <div class="my-3">
      <textarea id="note-content" class="textarea-color text-light rounded fs-5 textbox-border" minlength=1 maxlength=100000 style="border-color: ${this.color};">${this.content}</textarea>
    </div>
    <div class="d-flex justify-content-center">
    <button onclick="app.NotesController.removeNote('${this.id}')" class="btn delete-button fw-bold">Delete Note</button>
    </div>
  `
  }

  get noteClosedTemplate() {
    return `<div class="d-flex align-items-center justify-content-center title-div-height">
    <img
      src="https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
      alt="a journal" class="title-image">
  </div>`
  }


}