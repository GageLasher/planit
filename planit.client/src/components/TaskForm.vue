<template>
<form @submit.prevent="createTask">
<div class="row justify-content-center">
    <div class="row p-3">
        <div class="col-12">
            <label for="">Name: </label>
            <input v-model="editable.name" type="text" name="" id="">
        </div>
         <div class="col-12">
            <label for="">Weight: </label>
            <input v-model="editable.weight" type="number" name="" id="">
        </div>
        </div>
        <div class="row p-3 justify-content-end">
            <div class="col-4">
                <button class="btn btn-primary" type="submit">
                Submit
            </button>
            </div>
            
        </div>
    </div>
   
        
   
    
</form>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
import { tasksService } from '../services/TasksService'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import { sprintsService } from '../services/SprintsService'
export default {
    setup(){
       const editable = ref({})
       const router = useRouter()
    
        return {
            editable,
              async createTask(){
                try {
                    await tasksService.createTask(AppState.activeProject.id, editable.value)
                    Modal.getOrCreateInstance(
              document.getElementById("create-task")
            ).hide();
                } catch (error) {
                    logger.error(error.message)
                    Pop.toast(error.message, 'error')
                }
                },
     
        }
    }
}
</script>


<style lang="scss" scoped>
</style>