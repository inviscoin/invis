<!-- ARQUIVO: src/lib/components/NeonBorder.svelte -->
<script>
    export let color = "#00c8ff";
    export let pulse = false;
</script>

<div class="neon-wrapper" class:pulse style="--glow-color: {color}">
    <slot />
</div>

<style>
    .neon-wrapper {
        border: 1px solid var(--glow-color);
        box-shadow: 0 0 10px var(--glow-color);
        border-radius: inherit;
        transition: var(--transition-fast);
    }

    .pulse {
        animation: neon-throb 2s infinite ease-in-out;
    }

    @keyframes neon-throb {
        0%, 100% { opacity: 1; box-shadow: 0 0 10px var(--glow-color); }
        50% { opacity: 0.6; box-shadow: 0 0 20px var(--glow-color); }
    }
</style>