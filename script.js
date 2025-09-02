document.addEventListener('DOMContentLoaded', () => {
  // 🔎 SEARCH FILTER
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("keyup", function() {
      const query = this.value.toLowerCase();
      const rows = document.querySelectorAll(".searchable tbody tr");

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  // ⬆⬇ SORTING
  document.querySelectorAll(".sortable th").forEach(header => {
    header.addEventListener("click", () => {
      const table = header.closest("table");
      const index = Array.from(header.parentNode.children).indexOf(header);
      const rows = Array.from(table.querySelectorAll("tbody tr"));
      const ascending = header.classList.toggle("asc");

      rows.sort((a, b) => {
        const textA = a.children[index].innerText.trim();
        const textB = b.children[index].innerText.trim();

        if (!isNaN(Date.parse(textA)) && !isNaN(Date.parse(textB))) {
          return ascending
            ? new Date(textA) - new Date(textB)
            : new Date(textB) - new Date(textA);
        } else if (!isNaN(textA) && !isNaN(textB)) {
          return ascending
            ? Number(textA) - Number(textB)
            : Number(textB) - Number(textA);
        } else {
          return ascending
            ? textA.localeCompare(textB)
            : textB.localeCompare(textA);
        }
      });

      rows.forEach(row => table.querySelector("tbody").appendChild(row));
    });
  });

  // ➕ ADD NEW ROW (adds an editable row with appropriate column count)
  document.querySelectorAll('.add-row-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('section');
      if (!section) return;
      const table = section.querySelector('table');
      if (!table) return;
      const cols = table.querySelectorAll('thead th').length;
      const tbody = table.querySelector('tbody');
      const tr = document.createElement('tr');

      for (let i = 0; i < cols; i++) {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.spellcheck = false;

        // sensible placeholders for first few columns (company / reg / date), otherwise empty
        if (i === 0) td.innerText = 'New Company';
        else if (i === 1) td.innerText = 'New Reg';
        else if (i === 2) td.innerText = new Date().toLocaleDateString('en-GB');
        else td.innerText = '';

        tr.appendChild(td);
      }

      tbody.appendChild(tr);
      tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // focus first cell for quick editing
      const firstCell = tr.querySelector('td');
      if (firstCell) {
        firstCell.focus();
        // place caret at end
        const range = document.createRange();
        range.selectNodeContents(firstCell);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
  });
});