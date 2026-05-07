<script>
  import "../lib/styles/global.css";
  import "../lib/styles/tokens.css";
</script>

<slot />

<style>
  :global(body) {
    background-color: var(--bg-main);
    color: #E0E0E0;
    font-family: var(--font-main);
    margin: 0;
    overflow: hidden;
  }
</style>