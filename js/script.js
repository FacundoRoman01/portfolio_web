// /js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // Año dinámico en el footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Scroll suave entre secciones
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Dark/Light mode con persistencia
  const toggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  // Aplicar el tema guardado al cargar la página
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      // Guardar la preferencia del usuario
      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Botón "Volver arriba"
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.textContent = "↑";
  backToTop.setAttribute("aria-label", "Volver arriba");
  
  // No uses Object.assign para estilos fijos.
  backToTop.style.cssText = `
    position: fixed;
    right: 16px;
    bottom: 16px;
    padding: 10px 12px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    display: none;
    cursor: pointer;
    background: var(--secondary-color);
    color: #fff;
    font-weight: bold;
    z-index: 999;
  `;
  document.body.appendChild(backToTop);
  
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Validación del formulario de contacto
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        alert("Por favor, completá todos los campos.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Ingresá un email válido.");
        return;
      }
      alert("¡Mensaje enviado! 🚀");
      form.reset();
    });
  }
});