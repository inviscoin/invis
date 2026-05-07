<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  // Simulação de verificação de sessão (Parte 3)
  let isLoading = true;

  onMount(async () => {
    // No futuro, aqui verificaremos o token JWT no Supabase
    const userSession = localStorage.getItem('invis_token');
    
    if (!userSession) {
      // Se não houver login, manda para a tela de recepção oficial
      goto('/login');
    } else {
      // Se estiver logado, manda para o Dashboard (Parte 4)
      goto('/dashboard');
    }
  });
</script>

<main class="gpu-accelerated">
  {#if isLoading}
    <div class="loading-screen">
      <h1 style="color: var(--neon-cyan); text-shadow: 0 0 10px var(--neon-cyan);">INVIS</h1>
      <p>Sincronizando com a Matriz...</p>
    </div>
  {/if}
</main>

<style>
  .loading-screen {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0b0e11;
  }
</style>