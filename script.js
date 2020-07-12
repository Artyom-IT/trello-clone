document.querySelectorAll(".note").forEach(Note.draggingHandle);
document.querySelectorAll(".column").forEach(Note.btnHandler);

document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", Column.add);
document.querySelectorAll(".column-header").forEach(Column.headerHandler);
document.querySelectorAll(".column").forEach(Column.dragHandler);
