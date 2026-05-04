<script>
  import { registerBiometrics } from '../auth/biometrics_handler';
  export let userId;

  let status = "Desativado";
  let isActive = false;

  async function handleToggle() {
    const result = await registerBiometrics(userId);
    if (result.success) {
      isActive = true;
      status = "Ativado (Zero Click)";
      // Feedback tátil conforme padrão INVIS
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      alert(result.message);
    }
  }
</script>

<div class="biometric-card glass-container">
  <div class="info">
    <h3>Acesso Biométrico</h3>
    <p>Acesse com Digital ou FaceID</p>
  </div>
  
  <button 
    class="neon-toggle" 
    on:click={handleToggle}
    class:active={isActive}
  >
    {status}
  </button>
</div>

<style>
  /* Estética Glassmorphism e Neon conforme INVIS ESTRUTURAL */
  .biometric-card {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px; border-radius: 16px; background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 200, 255, 0.2); margin-top: 20px;
  }
  h3 { color: #00c8ff; margin: 0; font-size: 1.1rem; }
  p { color: #888; font-size: 0.8rem; margin: 5px 0 0; }
  .neon-toggle {
    background: transparent; border: 1px solid #FF4D4D; color: #FF4D4D;
    padding: 8px 15px; border-radius: 8px; cursor: pointer; transition: 0.3s;
  }
  .neon-toggle.active {
    border-color: #00FF80; color: #00FF80;
    box-shadow: 0 0 10px rgba(0, 255, 128, 0.4);
  }
</style>