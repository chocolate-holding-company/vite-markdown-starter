document.addEventListener("DOMContentLoaded", () => {
 const buttons = document.querySelectorAll(".filter-btn");
 const cards = document.querySelectorAll(".post-card");

 if (buttons.length === 0 || cards.length === 0) return;

 buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
   // Highlight active button
   buttons.forEach((b) => {
    b.className =
     "filter-btn bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-200 transition cursor-pointer";
   });
   btn.className =
    "filter-btn bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md transition cursor-pointer";

   const selectedTag = btn.getAttribute("data-tag").toLowerCase();

   // Filter post cards
   cards.forEach((card) => {
    const cardTags = card.getAttribute("data-tags");
    if (selectedTag === "all" || cardTags.includes(selectedTag)) {
     card.style.display = "block";
    } else {
     card.style.display = "none";
    }
   });
  });
 });
});
