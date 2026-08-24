const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");

chatBtn.onclick = () => {
  chatBox.style.display = "block";
};

closeChat.onclick = () => {
  chatBox.style.display = "none";
};

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.style.margin = "10px 0";
  div.style.padding = "10px";
  div.style.borderRadius = "10px";
  div.style.background =
    sender === "user" ? "#2563eb" : "#f1f5f9";
  div.style.color =
    sender === "user" ? "#fff" : "#000";
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addMessage("Typing...", "bot");

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    messages.lastChild.remove();

    addMessage(data.reply, "bot");

  } catch (err) {

    messages.lastChild.remove();

    addMessage(
      "Sorry, something went wrong.",
      "bot"
    );

    console.error(err);
  }
}

sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});