<template>
  <section class="container">
    <h2>Projects</h2>
    <b-form @submit.prevent="saveProject" v-if="$store.state.user.realm == 'client'" class="col-6" >
      <b-form-input
        type="text"
        v-model="project.name"
        required
        placeholder="Project title" />
      <b-form-textarea
        v-model="project.description"
        placeholder="Desription"
        rows="3"
        max-rows="6"
      />
      <b-form-input
        type="text"
        v-model="project.skills"
        required
        placeholder="Add skills comma separated" />
      <b-form-input
        type="number"
        v-model="project.totalprize"
        required
        placeholder="Project Total prize" />
      <b-form-input
        type="number"
        v-model="project.duration"
        required
        placeholder="Project Duration" />
        <button type="submit" class="btn btn-primary" name="button" >Add Project</button>
    </b-form>
    <b-list-group class="mt-5">
      <b-list-group-item v-for="project in projects" :key="project.id">
        <h4><nuxt-link :to="'project/'+project.id">
          {{project.name}}
        </nuxt-link></h4>
        <p> <small>{{project.created}}</small> </p>
        <p>{{project.description}}</p>
        <p> <small> Skills requried: {{project.skills || 'none'}}</small></p>
        <p> <small>Total Prize: {{project.totalPrize}}</small> | <small>Duration: {{project.duration}} days</small> </p>
        <div v-if="$store.state.user.realm == 'worker'">
          <button type="button" name="button" @click="apply(project.id)" v-if="!project.hasSelected && !project.currentApplied">Apply</button>
          <span v-if="project.hasSelected" class="badge badge-danger">Candidate has been selected for this task</span>
          <span v-if="project.currentApplied" class="badge badge-primary">You have applied to this project</span>
        </div>
      </b-list-group-item>
    </b-list-group>
  </section>
</template>

<script>

export default {
  middleware: 'axios',
  data () {
    return {
      projects: [],
      project: {
        name: null,
        description: null,
        totalprize: null,
        duration: null,
        skills: null
      }
    }
  },
  async asyncData (context) {
    let projects = await context.$axios.$get('/api/Tasks?filter[order]=created DESC&filter[include]=submissions')

    projects = projects.map(p => {
      p.hasSelected = !!p.submissions.find(s => s.selected)
      p.currentApplied = !!p.submissions.find(s => s.userId == context.store.state.user.id)
      return p
    })
    return {
      projects
    }
  },
  methods: {
    async saveProject () {
      try {
        const project = await this.$axios.$post('/api/Tasks', this.project)
        this.project = {
          name: null,
          description: null,
          totalprize: null,
          duration: null,
          skills: null
        }
        this.projects.unshift(project)
      } catch (e) {
        alert('Couldnt add project, error occured')
        console.error(e);
      }
    },
    async apply (taskId) {
      try {
        const submission = await this.$axios.$post('/api/Submissions', {
          userId: this.$store.state.user.id,
          taskId,
        })
        alert('Applied to this task')
      } catch (e) {
        console.error(e);
        alert('Application failed')
      }
    }
  }
}
</script>
