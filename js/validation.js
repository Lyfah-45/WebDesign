// Form validation for the booking and registration forms.
// Uses HTML5 attributes plus custom JavaScript rules and messages.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm") || document.getElementById("registerForm");
  if (!form) return;
  const isRegister = form.id === "registerForm";
  const alertBox = document.getElementById("formAlert");

  // Each rule returns an error message, or "" when the value is valid.
  const rules = {
    fullName: v => !v.trim() ? "Enter your full name."
      : !/^[A-Za-z][A-Za-z\s'-]{2,}$/.test(v.trim()) ? "Use letters only, at least 3 characters." : "",
    email: v => !v.trim() ? "Enter your email address."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Enter a valid email, like name@example.com." : "",
    phone: v => !v.trim() ? "Enter your phone number."
      : !/^(\+266|00266)?\s?[2-6]\d{3}\s?\d{4}$/.test(v.trim()) ? "Use a Lesotho number, like +266 5800 0000." : "",
    password: v => !v ? "Create a password."
      : v.length < 8 ? "Use at least 8 characters."
      : !/[a-z]/.test(v) || !/[A-Z]/.test(v) || !/\d/.test(v) ? "Include upper case, lower case and a number." : "",
    confirmPassword: v => !v ? "Confirm your password."
      : v !== form.password.value ? "Passwords do not match." : "",
    destination: v => v ? "" : "Choose a destination.",
    arrival: v => {
      if (!v) return "Pick an arrival date.";
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return new Date(v) < today ? "Arrival date cannot be in the past." : "";
    },
    guests: v => {
      const n = Number(v);
      return !v ? "Enter the number of guests."
        : (!Number.isInteger(n) || n < 1 || n > 20) ? "Enter a whole number from 1 to 20." : "";
    },
    terms: () => form.terms && form.terms.checked ? "" : "You must accept the terms to continue."
  };

  function setState(input, message) {
    const feedback = input.parentElement.querySelector(".invalid-feedback");
    input.classList.toggle("is-invalid", !!message);
    input.classList.toggle("is-valid", !message);
    if (feedback) feedback.textContent = message;
    return !message;
  }

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const value = input.type === "checkbox" ? input.checked : input.value;
    return setState(input, rule(value));
  }

  function validateGender() {
    if (!isRegister) return true;
    const ok = !!form.querySelector("input[name='gender']:checked");
    form.querySelector(".gender-feedback").textContent = ok ? "" : "Select an option.";
    return ok;
  }

  // Live feedback after the user leaves a field, then as they correct it
  form.querySelectorAll("input:not([type=radio]), select").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) validateField(input);
      if (input.name === "password" && form.confirmPassword.value) validateField(form.confirmPassword);
    });
  });
  form.querySelectorAll("input[name='gender']").forEach(r => r.addEventListener("change", validateGender));

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    let firstBad = null;
    form.querySelectorAll("input:not([type=radio]), select").forEach(input => {
      if (!validateField(input)) { valid = false; firstBad = firstBad || input; }
    });
    if (!validateGender()) valid = false;

    alertBox.classList.remove("d-none", "alert-success", "alert-danger");
    if (!valid) {
      alertBox.classList.add("alert-danger");
      alertBox.textContent = "Please fix the highlighted fields and try again.";
      if (firstBad) firstBad.focus();
      return;
    }
    alertBox.classList.add("alert-success");
    const name = form.fullName.value.trim().split(" ")[0];
    alertBox.textContent = isRegister
      ? "Welcome, " + name + "! Your account has been created."
      : "Thank you, " + name + ". Your booking request for " + form.destination.value + " has been sent.";
    form.reset();
    form.querySelectorAll(".is-valid, .is-invalid").forEach(el => el.classList.remove("is-valid", "is-invalid"));
    alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
