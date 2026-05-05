import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <span>SF</span>
        </div>
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Inicia sesión en tu cuenta</p>

        <form>
          <div className="input-group">
            <label className="input-label">Correo electrónico</label>
            <input
              className="input-field"
              type="email"
              placeholder="tu@email.com"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
            />
            <a href="#" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </form>

        <div className="divider">
          <span>o continuar con</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn" type="button">
            Google
          </button>
          <button className="social-btn" type="button">
            GitHub
          </button>
        </div>

        <p className="signup-text">
          ¿No tienes cuenta?{" "}
          <a href="#" className="signup-link">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
