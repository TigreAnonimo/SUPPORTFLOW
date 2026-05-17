import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // ⭐ LOGIN REAL (con backend)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Credenciales incorrectas.");
        return;
      }

      // Guardar token real
      localStorage.setItem("token", data.token);

      // Guardar email del usuario
      localStorage.setItem("sf_current_user", email.trim().toLowerCase());

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor.");
    }
  };

  // ⭐ REGISTRO REAL (con backend)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Completa todos los campos para registrarte.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar usuario");
        return;
      }

      alert("Cuenta creada correctamente. Ahora inicia sesión.");
      resetFields();
      setIsRegisterMode(false);
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor.");
    }
  };

  const GOOGLE_SIGNUP_URL = "https://accounts.google.com/signup";
  const GITHUB_SIGNUP_URL = "https://github.com/signup";

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <span>SF</span>
        </div>

        <h1 className="login-title">
          {isRegisterMode ? "Crear cuenta" : "Bienvenido"}
        </h1>

        <p className="login-subtitle">
          {isRegisterMode
            ? "Registra tu cuenta para empezar"
            : "Inicia sesión en tu cuenta"}
        </p>

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          {isRegisterMode && (
            <div className="input-group">
              <label className="input-label">Nombre</label>
              <input
                className="input-field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Correo electrónico</label>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {!isRegisterMode && (
              <a href="#" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </a>
            )}
          </div>

          {isRegisterMode && (
            <div className="input-group">
              <label className="input-label">Confirmar contraseña</label>
              <input
                className="input-field"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          )}

          <button type="submit" className="login-btn">
            {isRegisterMode ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </form>

        {!isRegisterMode && (
          <>
            <div className="divider">
              <span>o continuar con</span>
            </div>

            <div className="social-buttons">
              <button
                className="social-btn"
                type="button"
                onClick={() =>
                  window.open(GOOGLE_SIGNUP_URL, "_blank", "noopener,noreferrer")
                }
              >
                Google
              </button>

              <button
                className="social-btn"
                type="button"
                onClick={() =>
                  window.open(GITHUB_SIGNUP_URL, "_blank", "noopener,noreferrer")
                }
              >
                GitHub
              </button>
            </div>
          </>
        )}

        <p className="signup-text">
          {isRegisterMode ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
          <button
            type="button"
            className="signup-link"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              resetFields();
            }}
          >
            {isRegisterMode ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}
