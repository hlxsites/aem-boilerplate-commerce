const modalPar = document.querySelectorAll(
  ".modal-content .columns-2-cols div div p:nth-child(2), \
    .modal-content .columns-2-cols div div p:nth-child(3), \
    .modal-content .columns-2-cols div div p:nth-child(4)"
);
modalPar.forEach((element) => {
  if (element) {
    element.classList.add("modal-par");
  }
});
