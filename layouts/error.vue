<template>
  <div>
        <div class="loading404">
      <div>
      <span></span>
        <span></span>
          <span></span>
          </div>
    </div>
    <h1>404</h1>
  </div>
</template>

<script>
export default {
  beforeMount() {
        window.location.replace("/")
  }
}
</script>
