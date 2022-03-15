<template>
<form @submit.prevent="createSprint">
<div class="row justify-content-center">
    <div class="row p-3">
        <div class="col-12">
            <label for="">Name: </label>
            <input v-model="editable.name" type="text" name="" id="">
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
import { projectsService } from '../services/ProjectsService'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import { sprintsService } from '../services/SprintsService'
export default {
    setup(){
       const editable = ref({})
       const router = useRouter()
    
        return {
            editable,
            async createSprint(){
                try {
                    await sprintsService.createSprint(editable.value, AppState.activeProject.id)
                   
                     Modal.getOrCreateInstance(
              document.getElementById("create-sprint")
            ).hide();
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, "error")
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>