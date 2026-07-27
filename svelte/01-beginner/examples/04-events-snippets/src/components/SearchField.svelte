<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    label?: string;
  }

  // $bindable ทำให้ parent ใช้ bind:value ได้
  let {
    value = $bindable(''),
    placeholder = 'ค้นหา…',
    label = 'Search'
  }: Props = $props();

  function handleInput(e: Event) {
    value = (e.currentTarget as HTMLInputElement).value;
  }
</script>

<label class="field">
  <span>{label}</span>
  <input
    type="search"
    {value}
    {placeholder}
    oninput={handleInput}
  />
</label>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  span {
    font-size: 0.9rem;
    color: #475569;
  }

  input {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 0.55rem 0.75rem;
    background: #fff;
  }

  input:focus {
    outline: 2px solid #99f6e4;
    border-color: #0d9488;
  }
</style>
