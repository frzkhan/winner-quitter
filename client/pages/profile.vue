<template lang="html">
  <div class="pt-5">
    <b-form-input
          type="text"
          v-model="name"
          required
          placeholder="Enter Name" />
    <b-form-textarea
      v-model="skills"
      placeholder="Enter skills comma separated"
      rows="3"
      max-rows="6"
    />
    <b-button variant="success" @click="update">Update</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  middleware: 'axios',
  data () {
    return {
      profile: {}
    }
  },
  methods: {
    update () {
      const profileId = this.$store.state.user.profile.id

      this.$axios.$patch(`/api/Profiles/${profileId}`, {
        name: this.profile.name,
        skills: this.profile.skills
      })
      alert('Profile updated!')
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    name: {
      get() {
        return this.user.profile.name
      },
      set(value) {
        this.profile.name = value
      }
    },
    skills: {
      get() {
        return this.user.profile.skills
      },
      set(value) {
        this.profile.skills = value
      }
    }
  }
}
</script>

<style lang="css">
</style>
