<template>
  <div>
    <h1>404 - Page Non Trouvée</h1>
    <p>La page que vous cherchez n'existe pas.</p>
    <router-link to="/">Retourner à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
h1 {
  color: red;
  text-align: center;
}
</style>