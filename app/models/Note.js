import { generateId } from "../utils/GenerateId.js"

export class Note {

  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.content = data.content || "No content"
    this.color = null
    this.createdDate = data.createdDate ? new Date(data.createdDate) : new Date()
    this.updatedDate = null
  }

  get NoteCardsTemplate() {
    return `
    <li>${this.title}</li>
    `
  }


  get ActiveNoteTemplate() {
    return `          <div id="active-note-input">
    <p>Title: ${this.title}</p>
    <p>Created at: ${this.createdDate.toLocaleString()}</p>
    <p>Updated at: ${this.updatedDate.toLocaleString()}</p>
    <div class="d-flex justify-content-between">
    <div>
      <p>Words: <span>0</span></p>
      <p>Chatacters: <span>0</span></p>
    </div>
    <button onclick="app.NotesController.saveActiveNote('${this.content}')" class="btn btn-success")>Save</button>
    </div>
    </div>
    <div>
      <textarea class="bg-dark text-light rounded fs-5">${this.content}</textarea>
    </div>
  </div>`
  }

}