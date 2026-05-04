<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let birthDate = "";
  let calculatedAge = "";
  let isValid = false;

  // Formatação automática dd/mm/aa e cálculo de idade
  function handleInput(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length >= 6) {
        v = v.substring(0,6);
        const day = v.substring(0,2);
        const month = v.substring(2,4);
        const year = v.substring(4,6);
        birthDate = `${day}/${month}/${year}`;
        
        // Cálculo simplificado de idade para o padrão INVIS
        const currentYear = new Date().getFullYear() % 100;
        let age = currentYear - parseInt(year);
        if (age < 0) age += 100; 
        calculatedAge = `${age} Anos`;
        isValid = true;
    } else {
        isValid = false;
        calculatedAge = "";
    }
  }

  function confirm() {
    if (isValid) dispatch('confirm', { birthDate, calculatedAge });
  }

  function cancel() {
    // Apaga informações e encerra acesso conforme regra INVIS
    window.location.href = "/login";
  }
</script>

<div class="age-modal-overlay">
  <div class="glass-container">
    <h2>Qual sua data de Nascimento?</h2>
    <input 
      type="text" 
      placeholder="dd/mm/aa" 
      on:input={handleInput} 
      maxlength="8"
      class="neon-input"
    />
    {#if calculatedAge}
      <p class="age-display">{calculatedAge}</p>
    {/if}

    <div class="button-group">
      <button class="btn-cancel" on:click={cancel}>Cancelar</button>
      <button class="btn-ok" disabled={!isValid} on:click={confirm}>Ok</button>
    </div>
  </div>
</div>

<style>
  /* Estética Glassmorphism e Neon conforme INVIS ESTRUTURAL */
  .age-modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(20px);
    display: flex; justify-content: center; align-items: center; z-index: 9999;
  }
  .glass-container {
    background: rgba(11, 14, 17, 0.7); border: 1px solid rgba(0, 200, 255, 0.3);
    padding: 40px; border-radius: 24px; text-align: center; color: white;
  }
  .neon-input {
    background: transparent; border: 1px solid #00c8ff; color: white;
    padding: 10px; border-radius: 8px; text-align: center; margin: 20px 0;
  }
  .btn-ok { background: #00FF80; color: black; border: none; padding: 10px 30px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  .btn-ok:disabled { background: #555; cursor: not-allowed; }
  .btn-cancel { background: transparent; color: #FF4D4D; border: 1px solid #FF4D4D; padding: 10px 20px; border-radius: 8px; margin-right: 10px; }
</style>