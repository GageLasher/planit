<template>
  <form @submit.prevent="editTask">
    <div class="row justify-content-center">
      <div class="row p-3">
        <div class="col-12">
          <label for="">Name: </label>
          <input v-model="task.name" type="text" name="" id="" />
        </div>
        <div class="col-12">
          <label for="">Weight: </label>
          <input v-model="task.weight" type="number" name="" id="" />
        </div>
        <div class="col-12">
          <select v-model="editable.sprintId">
            <option v-for="s in sprints" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row p-3 justify-content-end">
        <div class="col-4">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
import { Modal } from 'bootstrap'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { sprintsService } from '../services/SprintsService'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editable = ref({})

    return {
      editable,

      sprints: computed(() => AppState.sprints),
      async editTask() {
        // logger.log(editable.value.sprintId)
        props.task.sprintId = editable.value.sprintId
        // logger.log(props.task)

        Modal.getOrCreateInstance(document.getElementById('edit-task' + props.task.id)).hide()
        await tasksService.edit(props.task)

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>