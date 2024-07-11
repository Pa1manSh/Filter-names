<template>
  <div class="profile-header">
    <h1>Профиль игрока: {{ playerName }}</h1>
  </div>
</template>

<script>
export default {
  name: "PlayerProfile",
  computed: {
    playerName() {
      return this.$route.params.name;
    },
  },
};
</script>

<style scoped>
.profile-header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
