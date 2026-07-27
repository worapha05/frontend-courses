<script lang="ts">
  interface Props {
    label?: string;
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
  }

  let { label = 'Click', disabled = false, onclick }: Props = $props();
</script>

<button type="button" {disabled} {onclick}>{label}</button>

<style>
  button {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 0.4rem 0.8rem;
    background: #0f766e;
    color: #fff;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>
