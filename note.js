const Note = {
  noteId: 8,
  activeDraggingEl: null,

  editContentHandle (note) {
    note.addEventListener('dblclick', () => {
      note.setAttribute('contenteditable', true)
      note.focus()
      note.removeAttribute('draggable')
      note.closest('.column').removeAttribute('draggable')
    })

    note.addEventListener('blur', () => {

      if(!note.textContent.trim().length) {
        note.remove()
      }

        note.setAttribute('draggable', true)
        note.removeAttribute('contenteditable')
        note.textContent = note.textContent.trim()
        document.querySelectorAll('.column').forEach(el => el.setAttribute('draggable', true))
    })
  },

  draggingHandle(note) {
    note.addEventListener('dragstart', Note.dragstart)
    note.addEventListener('dragend', Note.dragend)
    note.addEventListener('dragenter', Note.dragenter)
    note.addEventListener('dragover', Note.dragover)
    note.addEventListener('dragleave', Note.dragleave)
    note.addEventListener('drop', Note.drop)
  },

  dragstart (event) {
    document.querySelectorAll('.column').forEach(column => column.setAttribute('draggable', false))
    event.stopPropagation()
    Note.activeDraggingEl = this
    this.classList.add('dragged')
  },
  dragend (event) {
    document.querySelectorAll('.column').forEach(column => column.setAttribute('draggable', true))
    this.classList.remove('dragged')
    Note.activeDraggingEl = null
    document.querySelectorAll('.note').forEach(el => el.classList.remove('dragged'))
  },
  dragenter (event) {

    if(!Note.activeDraggingEl || this === Note.activeDraggingEl) {
      return
    }

    this.classList.add('under')
  },
  dragleave (event) {
    
    if(!Note.activeDraggingEl || this === Note.activeDraggingEl) {
      return
    }
    this.classList.remove('under')
  },
  dragover (event) {
    event.preventDefault()
    if(!Note.activeDraggingEl || this === Note.activeDraggingEl) {
      return
    }
  },
  drop (event) {
    event.stopPropagation()
    if(!Note.activeDraggingEl || this === Note.activeDraggingEl){
      return
    }
    this.classList.remove('under')
  
    if(this.parentElement === Note.activeDraggingEl.parentElement) {
      const notesArr = Array.from(this.parentElement.querySelectorAll('.note'))
      const indexA = notesArr.indexOf(this)
      const indexB = notesArr.indexOf(Note.activeDraggingEl)
      if(indexA < indexB ) {
        this.parentElement.insertBefore(Note.activeDraggingEl, this)  
      } else {
        this.parentElement.insertBefore(Note.activeDraggingEl, this.nextElementSibling)
      }
    } else {
      this.parentElement.insertBefore(Note.activeDraggingEl, this)
    }
  },

  btnHandler (column) {
    const addNoteBtn = column.querySelector('[data-action-addNote]')

    addNoteBtn.addEventListener('click', () => {
      const note = document.createElement('div')
      note.classList.add('note')
      note.setAttribute('draggable', true)
      note.setAttribute('data-note-id', Note.noteId)

      note.setAttribute('contenteditable', true)
      
      Note.noteId++
      
      column.querySelector('[data-notes]').append(note)
      note.focus()
      Note.editContentHandle(note)
      Note.draggingHandle(note)
    })
}
  
}