// campaign-switch.js
// Handles switching between campaign tables for Ken Sargent House and Brightwell Medical Center

document.addEventListener("DOMContentLoaded", function () {
  const kshBtn = document.getElementById("show-ksh-table");
  const brightwellBtn = document.getElementById("show-brightwell-table");
  const kshTable = document.getElementById("ksh-campaign-table");
  const brightwellTable = document.getElementById("brightwell-campaign-table");

  if (!kshBtn || !brightwellBtn || !kshTable || !brightwellTable) return;

  kshBtn.addEventListener("click", function () {
    kshTable.style.display = "block";
    brightwellTable.style.display = "none";
    kshBtn.classList.add("active");
    brightwellBtn.classList.remove("active");
  });

  brightwellBtn.addEventListener("click", function () {
    kshTable.style.display = "none";
    brightwellTable.style.display = "block";
    kshBtn.classList.remove("active");
    brightwellBtn.classList.add("active");
  });
});
