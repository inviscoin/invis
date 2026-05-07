<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    // Verifica token de sessão JWT [11, 12]
    const userSession = localStorage.getItem('invis_token');
    
    // Pequeno delay para transição fluida
    setTimeout(() => {
      if (!userSession) {
        goto('/login');
      } else {
        goto('/dashboard');
      }
    }, 1000);
  });
</script>

<main class="gate-keeper">
  <div class="loader-container">
    <h1 class="neon-text">INVIS</h1>
    <div class="pulse-ring"></div>
    <p>Sincronizando com a Matriz...</p>
  </div>
</main>

<style>
  .gate-keeper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0b0e11;
  }
  .neon-text {
    color: var(--neon-cyan);
    text-shadow: 0 0 15px var(--neon-cyan);
    font-size: 3rem;
  }
  .pulse-ring {
    border: 2px solid var(--neon-cyan);
    border-radius: 50%;
    height: 100px;
    width: 100px;
    position: absolute;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { transform: scale(0.5); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }
</style>