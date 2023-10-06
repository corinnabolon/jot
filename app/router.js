import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";
import { NotesController } from "./controllers/NotesController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: NotesController,
    view: null,
    view: /*html*/`
    <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-md-4 border">
      <div>
      <form onsubmit="app.NotesController.createNote(event)">
      <label for="title">Title</label>
      <input id="title" name="title" type="text" required minlength="3" maxlength="15" placeholder="New Note Title">
      </input>
      <button type="submit" class="btn btn-success">Create New Note</button> 
      <div class="mb-2">
      <label for="color">Color</label>
      <input class="color" id="color" type="color" name="color" value="#000000">
    </div>
      </form>
      </div>
        <div>
          <p>List of Journals</p>
        </div>
        <div id="notes-count"></div>
        <div>
          <div id="notes-list">
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 border">
        <div>
          <p>Active Note Goes Here</p>
          <div id="active-note-input"></div>
        </div>
      </div>
    </section>
  </div>`
  },


  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]