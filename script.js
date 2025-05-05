function previewImage() {
  const file = document.getElementById("profileImage").files[0];
  const preview = document.getElementById("imagePreview");
  const container = document.getElementById("previewContainer");
  if (file) {
    preview.src = URL.createObjectURL(file);
    container.classList.remove("hidden");
  }
}

function addMessage() {
  document.getElementById("noMessages")?.classList.add("hidden");
  const div = document.createElement("div");
  div.className =
    "flex items-center gap-2 bg-gray-800 border border-gray-700 p-3 rounded-xl fade-in";
  div.innerHTML = `
    <div class="relative">
      <select class="from w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs rounded-full pl-4 pr-10 py-2 appearance-none focus:outline-none shadow-sm">
        <option value="me">Me</option>
        <option value="them">Them</option>
      </select>
      <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10l4 4 4-4"/>
        </svg>
      </div>
    </div>
    <input type="text" placeholder="Message..." class="text flex-1 bg-gray-900 h-8 px-3 rounded-full text-xs transition-all"/>
    <button class="remove bg-emerald-600 hover:bg-emerald-500 w-7 h-7 rounded-full flex items-center justify-center text-white">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>`;
  div.querySelector(".remove").onclick = () => {
    div.remove();
    const messages = document.querySelectorAll(
      "#messages > div:not(#noMessages)"
    );
    if (!messages.length)
      document.getElementById("noMessages")?.classList.remove("hidden");
  };
  document.getElementById("messages").appendChild(div);
}

new Sortable(document.getElementById("messages"), {
  animation: 150,
  ghostClass: "opacity-40",
});

function setupDragAndDrop(dropId, inputId, labelId) {
  const drop = document.getElementById(dropId),
    input = document.getElementById(inputId),
    label = document.getElementById(labelId);
  drop.onclick = () => input.click();
  ["dragover", "dragleave", "drop"].forEach((event) =>
    drop.addEventListener(event, (e) => {
      e.preventDefault();
      drop.classList.toggle("dragover", event === "dragover");
      if (event === "drop") {
        input.files = e.dataTransfer.files;
        if (input.files[0]) label.textContent = input.files[0].name;
      }
    })
  );
}

setupDragAndDrop("dropVideo", "backgroundVideo", "videoName");
setupDragAndDrop("dropImage", "profileImage", "imageName");