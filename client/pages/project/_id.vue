<template lang="html">
  <div class="">
    <h1>{{project.name}}</h1>
    <small>Total Prize: {{project.totalprize}} | Duration: {{project.duration}}</small>
    <p>{{project.description}}</p>
    <p>Skills Required: {{project.skills}}</p>
    <br>

    <br>
    <div class="" v-if="$store.state.user.realm == 'client'" >
      <h2>Submissions</h2>
      <p v-if="!project.submissions.length">No applications</p>
      <b-list-group class="mt-5">
        <b-list-group-item v-for="sub in project.submissions" :key="sub.id">
          <div class="row">
            <div class="col-6">
              {{sub.user.profile.name}} - {{sub.user.email}} <br>
              Availability: {{sub.metrics.availability}} |
              Expert: {{sub.metrics.expert}} |
              Interest: {{sub.metrics.interest}} |
              Reliability: {{sub.metrics.reliability}}
            </div>
            <div class="col-6">
              <button type="button" v-if="!sub.selected && !sub.canceled " class="float-right" @click="select(sub.id)" name="button">Select</button>
              <p v-if="sub.selected && !sub.delivered" class="float-right badge badge-primary" >Selected, waiting for delivery</p>
              <p v-if="sub.canceled" class="badge badge-primary">Canceled</p>

              <div v-if="sub.delivered && !sub.completed" class="float-right">
                Rate: <select class="" name="" v-model="rating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="button" @click="approve(sub.id)" name="button">Approve</button>
              </div>
              <div v-if="sub.completed" class="float-right">
                Rated: {{sub.rated}}
              </div>
            </div>
          </div>

        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="" v-if="$store.state.user.realm == 'worker'">
      <p v-if="isUserSelected && !isUserSelected.delivered">You were selected for this task</p>
      <button v-if="isUserSelected && !isUserSelected.delivered" type="button" name="button" @click="deliver(isUserSelected.id)">Deliver Project</button>
      <button v-if="isUserSelected && !isUserSelected.delivered" type="button" name="button" @click="cancel(isUserSelected.id)">Cancel Project</button>
      <p v-if="isUserSelected && isUserSelected.delivered && !isUserSelected.completed" class="badge badge-primary">Project Delivered, waiting for approval</p>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  middleware: 'axios',
  name: "project",
  data () {
    return {
      isUserSelected: null,
      rating: null
    }
  },
  async asyncData (context) {
    const projectId = context.route.params.id
    const project = await context.$axios.$post(`/api/Tasks/submissions`, {
      taskId: projectId
    })
    const isSelected = !!project.submissions.find(s => s.selected)
    const submissions = project.submissions.filter(s => s.selected)
    if (isSelected) {
      project.submissions = submissions
    }
    project.submissions = _.orderBy(project.submissions, ['metrics.expert', 'metrics.reliability', 'metrics.interest', 'metrics.availability'], ['desc', 'desc', 'desc', 'desc'])
    return { project }
  },
  created () {
    this.isUserSelected = this.project.submissions.find(sub => {
      return sub.userId === this.$store.state.user.id && sub.selected && !sub.canceled
    })
  },
  methods: {
    async getProject (id) {
      const project = await this.$axios.$post(`/api/Tasks/submissions`, {
        taskId: id
      })
      const isSelected = !!project.submissions.find(s => s.selected)
      const submissions = project.submissions.filter(s => s.selected)
      if (isSelected) {
        project.submissions = submissions
      }
      return project
    },
    async select (subId) {
      const userId = this.$store.state.user.id
      const submission = await this.$axios.$patch(`/api/Submissions/${subId}`, {
        selected: true,
        selectedDate: new Date().toISOString()
      })
      alert('Selected')

      this.project = await this.getProject(this.project.id)
    },
    async deliver (subId) {
      const userId = this.$store.state.user.id
      const submission = await this.$axios.$patch(`/api/Submissions/${subId}`, {
        delivered: true,
        deliveredDate: new Date().toISOString()
      })
      alert('Delivered')

      this.project = await this.getProject(this.project.id)
    },
    async cancel (subId) {
      const userId = this.$store.state.user.id
      const submission = await this.$axios.$patch(`/api/Submissions/${subId}`, {
        canceled: true,
        selected: false
      })
      alert('Canceled')

      this.project = await this.getProject(this.project.id)
    },
    async approve (subId) {
      if (!this.rating) {
        alert('please rate the work before approval')
        return
      }
      const userId = this.$store.state.user.id
      const submission = await this.$axios.$patch(`/api/Submissions/${subId}`, {
        completed: true,
        completedDate: new Date().toISOString(),
        rated: this.rating
      })
      alert('Approved')
      this.project = await this.getProject(this.project.id)
    }
  }
}
</script>
