function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  
    // Make inputs look better in dark mode
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((el) => {
      if (document.body.classList.contains("dark-mode")) {
        el.classList.add("bg-dark", "text-white", "border-secondary");
      } else {
        el.classList.remove("bg-dark", "text-white", "border-secondary");
      }
    });
  }
  
  function formatNumber(num, padding) {
    const str = num.toString();
    return padding > 1 ? str.padStart(padding, "0") : str;
  }
  
  async function renameAndZip() {
    const files = [...document.getElementById("fileInput").files];
    const format = document.getElementById("formatInput").value;
    const start = parseInt(document.getElementById("startNum").value);
    const pad = parseInt(document.getElementById("padding").value);
    const extInput = document.getElementById("customExt").value.trim();
    const zipFolder = document.getElementById("zipFolder").value.trim() || "renamed_files";
    const preview = document.getElementById("preview");
  
    if (!format.includes("{$}")) {
      alert("Please include {$} in your format.");
      return;
    }
  
    if (files.length === 0) {
      alert("Please select some files.");
      return;
    }
  
    files.sort((a, b) => a.name.localeCompare(b.name));
  
    const zip = new JSZip();
    let folder = zip.folder(zipFolder);
    let previewHTML = `<h5>Preview:</h5><ul class="list-group mb-3">`;
  
    for (let i = 0; i < files.length; i++) {
      const ep = formatNumber(start + i, pad);
      const ext = extInput || files[i].name.split('.').pop();
      const newName = format.replace("{$}", ep) + "." + ext;
  
      const content = await files[i].text();
      folder.file(newName, content);
  
      previewHTML += `<li class="list-group-item">
        ✅ <b>${files[i].name}</b> → <code>${zipFolder}/${newName}</code>
      </li>`;
    }
  
    previewHTML += "</ul><div class='text-muted'>Compressing to ZIP...</div>";
    preview.innerHTML = previewHTML;
  
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = zipFolder + ".zip";
      link.click();
      preview.innerHTML += `<div class="text-success mt-2">✅ Download ready: <code>${zipFolder}.zip</code></div>`;
    });
  }
  
  // File list toggle
  const fileInput = document.getElementById("fileInput");
  const fileListSection = document.getElementById("file-list-section");
  const fileListBox = document.getElementById("file-list");
  const toggleFileListBtn = document.getElementById("toggle-file-list");
  
  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);
    if (files.length > 0) {
      fileListSection.style.display = "block";
      fileListBox.innerHTML = files
        .map((file, i) => `<div>${i + 1}. ${file.name}</div>`)
        .join("");
      toggleFileListBtn.textContent = "Show Selected Files";
      fileListBox.style.display = "none";
    } else {
      fileListSection.style.display = "none";
    }
  });
  
  toggleFileListBtn.addEventListener("click", () => {
    if (fileListBox.style.display === "none") {
      fileListBox.style.display = "block";
      toggleFileListBtn.textContent = "Hide File List";
    } else {
      fileListBox.style.display = "none";
      toggleFileListBtn.textContent = "Show Selected Files";
    }
  });

  
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
  
    // Save to localStorage
    localStorage.setItem("darkMode", isDark ? "on" : "off");
  
    // Update input styles
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((el) => {
      if (isDark) {
        el.classList.add("bg-dark", "text-white", "border-secondary");
      } else {
        el.classList.remove("bg-dark", "text-white", "border-secondary");
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "on") {
      document.body.classList.add("dark-mode");
  
      // Re-style inputs
      const inputs = document.querySelectorAll("input, select, textarea");
      inputs.forEach((el) =>
        el.classList.add("bg-dark", "text-white", "border-secondary")
      );
    }
  });
  