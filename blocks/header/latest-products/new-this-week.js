document.addEventListener("DOMContentLoaded", () => {
  const newThisWeekBanner = document.querySelectorAll(
    ".columns-container:nth-child(1) "
  );

  newThisWeekBanner.forEach((element) => {
    if (element) {
      element.classList.add("new-this-week");
      console.log("mounted");
    }
  });
});
