import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";
import { NotesController } from "./controllers/NotesController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: NotesController,
    // view: null,
    view: /*html*/`
    <div class="container-fluid">
      <section class="row class">
        <div class="col-12 col-md-3">
          <div class="fs-3 fw-bold font-nunito top-box mt-4 p-3">
            <form onsubmit="app.NotesController.createNote(event)">
              <label for="title">Title</label>
              <input id="title" name="title" type="text" required minlength="3" maxlength="15"
                placeholder="New Note Title" class="fs-4 title-input">
              </input>
              <div class="my-2">
                <label for="color">Color</label>
                <input class="color" id="color" type="color" name="color" value="#0802A3">
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn create-button mt-2">Create New Note</button>
                </div>
              </div>
            </form>
          </div>
          <div class="mt-3 pt-2 ps-2 mb-3 font-nunito bottom-box">
            <p class="fs-2 fw-bold">List of Notes:</p>
          <div id="notes-count" class="fw-bold font-nunito"></div>
            <div id="notes-list">
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div>
            <div id="active-note-input">
              <div class="d-flex align-items-center justify-content-center title-div-height">
                <img
                  src="https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
                  alt="a journal" class="title-image">
              </div>
            </div>
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