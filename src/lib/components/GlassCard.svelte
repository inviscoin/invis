<!-- ARQUIVO: src/lib/components/GlassCard.svelte -->
<script>
    export let borderColor = "rgba(255, 255, 255, 0.1)";
    export let padding = "20px";
</script>

<div class="glass-card" style="border: 1px solid {borderColor}; padding: {padding};">
    <slot />
</div>

<style>
    .glass-card {
        background: rgba(11, 14, 17, 0.7);
        backdrop-filter: var(--blur-standard);
        -webkit-backdrop-filter: var(--blur-standard);
        border-radius: 24px;
        position: relative;
        overflow: hidden;
    }
</style>