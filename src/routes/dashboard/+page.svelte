<script>
  import Top from "../../lib/components/Top.svelte";
  import Foot from "../../lib/components/Foot.svelte";
  import { blockStore } from "../../lib/stores/blocks"; // Criar esta store a seguir
</script>

<div class="dashboard-master">
  <Top />

  <main class="block-area">
    <!-- Aqui entrará a lógica de renderização de 1/3, 2/3 ou 3/3 [7] -->
    <div class="empty-state">
      <p>Nenhuma atividade ativa.</p>
      <p style="font-size: 0.7rem; color: var(--neon-purple);">Gire o carrossel para começar</p>
    </div>
  </main>

  <Foot />
</div>

<style>
  .dashboard-master {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0b0e11;
  }
  .block-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>