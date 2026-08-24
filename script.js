const consultationForm = document.getElementById("consultation-form");

if (consultationForm) {
    consultationForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Gather parameters matching your EmailJS template variables
        const templateParams = {
            client_name: document.getElementById("client-name").value,
            client_email: document.getElementById("client-email").value,
            client_date: document.getElementById("consultation-date").value
        };

        // Replace with your actual Service ID and Template ID
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
               alert('Consultation booked successfully! Email notification sent.');
               consultationForm.reset();
            }, function(error) {
               alert('Failed to send booking. Please try again or use WhatsApp.');
               console.error('EmailJS Error:', error);
            });
    });
}
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

// Updated addMessage function with timestamps and clean layout
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.style.margin = "10px 0";
  div.style.padding = "10px";
  div.style.borderRadius = "10px";
  div.style.background = sender === "user" ? "#2563eb" : "#f1f5f9";
  div.style.color = sender === "user" ? "#fff" : "#000";
  
  // Get current time for the timestamp
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  div.innerHTML = `
    <div style="word-break: break-word;">${text}</div>
    <div style="font-size: 0.65rem; opacity: 0.7; text-align: right; margin-top: 4px;">${time}</div>
  `;

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

    // Remove the "Typing..." message
    messages.lastChild.remove();

    addMessage(data.reply, "bot");

  } catch (err) {
    // Remove the "Typing..." message
    messages.lastChild.remove();

    addMessage("Sorry, something went wrong.", "bot");
    console.error(err);
  }
}

sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
const consultationForm = document.getElementById("consultation-form");

if (consultationForm) {
    consultationForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Gather parameters matching your EmailJS template variables
        const templateParams = {
            client_name: document.getElementById("client-name").value,
            client_email: document.getElementById("client-email").value,
            client_date: document.getElementById("consultation-date").value
        };

        // Replace with your actual Service ID and Template ID
        emailjs.send('service_yzf937', 'template_918c8pm', templateParams)
            .then(function(response) {
               alert('Consultation booked successfully! Email notification sent.');
               consultationForm.reset();
            }, function(error) {
               alert('Failed to send booking. Please try again or use WhatsApp.');
               console.error('EmailJS Error:', error);
            });
    });
}
