<template>
  <div class="container">
    <a href="/">Home</a> |
    <a href="/profile">Profile</a>
    <button type="button" v-if="$store.state.user.id" @click="logout" name="button">Logout</button>
    <nuxt />
  </div>
</template>

<script>
  export default {
    methods: {
      logout () {
        localStorage.clear()
        this.$store.commit('logout')
        this.$router.push('/login')

      }
    }
  }
</script>
