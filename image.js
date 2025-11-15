const form = document.getElementById("promptForm");
const input = document.getElementById("promptInput");
const image = document.getElementById("generatedImage");
const loader = document.getElementById("loader");
const downloadBtn = document.getElementById("downloadBtn");
const historyContainer = document.getElementById("historyContainer");

let history = [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prompt = input.value.trim();
  if (!prompt) return;

  image.style.display = "none";
  downloadBtn.style.display = "none";
  loader.style.display = "block";

  try {
    const response = await fetch(
      "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt)
    );

    image.src = response.url;

    image.onload = () => {
      loader.style.display = "none";
      image.style.display = "block";

      downloadBtn.href = image.src;
      downloadBtn.style.display = "inline-block";

      saveToHistory(image.src);
    };
  } catch (err) {
    loader.style.display = "none";
    alert("Image generation failed. Try again.");
  }
});

function saveToHistory(url) {
  history.unshift(url);
  if (history.length > 5) history.pop();
  renderHistory();
}

function renderHistory() {
  historyContainer.innerHTML = "";

  history.forEach((imgUrl) => {
    const img = document.createElement("img");
    img.src = imgUrl;

    img.addEventListener("click", () => {
      image.src = imgUrl;
      image.style.display = "block";
      downloadBtn.href = imgUrl;
      downloadBtn.style.display = "inline-block";
    });

    historyContainer.appendChild(img);
  });
}