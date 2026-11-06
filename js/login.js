// ENDPOINT
const AUTH_URL = "https://dummyjson.com/auth/login";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formularioLogin");
    const alertaError = document.getElementById("alertaError");
    const btnIngresar = document.getElementById("btnIngresar");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        alertaError.classList.add("d-none");
        btnIngresar.disabled = true;
        btnIngresar.textContent = "Verificando...";

        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

try {
            // Usamos AUTH_URL en lugar del texto reemplazado
            const response = await fetch(AUTH_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput,
                    password: passwordInput,
                    expiresInMins: 60
                })
            });

            const data = await response.json();

            if (response.ok && data.accessToken) {
                sessionStorage.setItem("userSession", JSON.stringify({
                    token: data.accessToken,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    image: data.image
                }));

                window.location.href = "./index.html";
            } else {
                alertaError.textContent = data.message || "Credenciales inválidas.";
                alertaError.classList.remove("d-none");
            }
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            alertaError.textContent = "Error de conexión con el servidor de autenticación.";
            alertaError.classList.remove("d-none");
        } finally {
            btnIngresar.disabled = false;
            btnIngresar.textContent = "Iniciar Sesión";
        }
    });
});