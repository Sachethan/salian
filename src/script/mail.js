const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLpueCddT-Os71Z4kqvKXpKJBOEPTTvQs0zyc_N3P1LOFoYM4VRVW5z8ztkW6-uG3g/exec";

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const loader = document.getElementById('loader');
  loader.classList.add('show');

  const form = e.target;
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  const messageShow = data.message;

  // Save to localStorage
  localStorage.setItem("tempname", data.name);
  localStorage.setItem("tempemail", data.email);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(response => {
    document.getElementById("formResponse").textContent = "Message sent successfully!";
    loader.classList.remove('show');

    // Show formatted message
    showMessage(
      `<strong>Message sent successfully!</strong><br> [ ${messageShow} ]`,
      "info"
    );

    // Only clear the message field
    form.message.value = "";
  })
  .catch(err => {
    document.getElementById("formResponse").textContent = "Failed to send message. Try again.";
    console.error("Error:", err);
    loader.classList.remove('show');
  });
});
