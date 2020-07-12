const Column = {
  columnId: 4,
  activeDraggingEl: null,

  add() {
    const column = Column.create()

    document.querySelector(".columns").append(column);


    Column.dragHandler(column)
    
    const columnHeader = column.querySelector(".column-header");
    columnHeader.focus();
    
    columnHeader.addEventListener("blur", () => {

      columnHeader.textContent = columnHeader.textContent.trim()
      columnHeader.removeAttribute("contenteditable");
    });
  },

  create() {
    const column = document.createElement("div");

    column.classList.add("column");
    column.setAttribute("draggable", true);
    column.setAttribute("data-column-id", Column.columnId);
    column.innerHTML = `
      <p class="column-header" contenteditable="true">Enter name of card</p>
      <div data-notes>
      </div>
      <p class="column-footer">
        <span data-action-addNote class="action">+ Добавить карточку</span>
      </p>
    `;

    Column.columnId++;
    Column.headerHandler(column.querySelector('.column-header'))
    Note.btnHandler(column)

    return column
  },

  headerHandler(header) {
    header.addEventListener("dblclick", () => {
      header.setAttribute("contenteditable", true);
      header.parentElement.removeAttribute("draggable");
      header.focus();
    });

    header.addEventListener("blur", () => {

      if (!header.textContent) {
        header.textContent = "Enter name of card";
      }

      header.parentElement.setAttribute("draggable", true);
      header.removeAttribute("contenteditable");
    });
  },

  dragHandler(column) {
    column.addEventListener('dragstart', Column.dragstart)
    column.addEventListener('dragend', Column.dragend)
    column.addEventListener('dragover', Column.dragover)
    column.addEventListener('drop', Column.drop)
  },

  dragstart (event) {
    event.stopPropagation()
    Column.activeDraggingEl = this
    this.classList.add('dragged')
  },

  dragend (event) {
    Column.activeDraggingEl = null
    Column.dropped = null
    this.classList.remove('dragged')
    document.querySelectorAll('.column').forEach(el => {
      el.classList.remove('dragged')
      el.classList.remove('under')
    })
  },

  dragover (event) {
    event.preventDefault()

    if(!Column.activeDraggingEl || this === Column.activeDraggingEl) {
      return
    }

    if(Column.activeDraggingEl === this) {

        if(column.dropped) {
          Column.dropped.classList.remove('under')
        }

      Column.dropped = null

    }

    Column.dropped = this

    document
      .querySelectorAll('.column')
      .forEach(el => el.classList.remove('under'))

    this.classList.add('under')
  },

  drop (event) {
    if(!Column.activeDraggingEl || this === Column.activeDraggingEl) {
      return
    }

    const columnsArr = Array.from(this.parentElement.querySelectorAll('.column'))
    const indexA = columnsArr.indexOf(this)
    const indexB = columnsArr.indexOf(Column.activeDraggingEl)

    if(indexA < indexB) {
      this.parentElement.insertBefore(Column.activeDraggingEl, this)
    } else {
      this.parentElement.insertBefore(Column.activeDraggingEl, this.nextElementSibling)
    }

  },

  validateDrag() {
    if(!Column.activeDraggingEl || this === Column.activeDraggingEl) {
      return
    }
  }
}