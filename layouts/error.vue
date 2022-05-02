<template>
  <div>
    <!-- === Loading === -->
    <div class="loading404">
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!-- === End Loading === -->

    <!-- === Headline === -->
    <h1>404</h1>
    <!-- === End Headline === -->
  </div>
</template>

<script>
export default {
  // Redirect the user to the main in case he entered a path that does not exist
  beforeMount() {
    window.location.replace('/');
  },
};
</script>
