  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLpueCddT-Os71Z4kqvKXpKJBOEPTTvQs0zyc_N3P1LOFoYM4VRVW5z8ztkW6-uG3g/exec";

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
          })
      .then(res => res.json())
      .then(response => {
        document.getElementById("formResponse").textContent = "Message sent successfully!";
        form.reset();
      })
      .catch(err => {
        document.getElementById("formResponse").textContent = "Failed to send message. Try again.";
        console.error("Error:", err);
      });
  });