document.querySelectorAll(".note").forEach(Note.draggingHandle);
document.querySelectorAll(".column").forEach(Note.btnHandler);

document.querySelectorAll('.close').forEach(el => el.addEventListener('click', () => {
  el.closest('.note').remove()
}))

document.querySelectorAll('.close-column').forEach(el => el.addEventListener('click', () => {
  el.parentElement.remove()
}))

document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", Column.add);
document.querySelectorAll(".column-header").forEach(Column.headerHandler);
document.querySelectorAll(".column").forEach(Column.dragHandler);
