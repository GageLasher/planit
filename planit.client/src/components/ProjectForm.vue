<template>
<form @submit.prevent="createProject">
<div class="row justify-content-center">
    <div class="row p-3">
        <div class="col-12">
            <label for="">Name: </label>
            <input v-model="editable.name" type="text" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Description: </label>
            <input v-model="editable.description" type="text" name="" id="">
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
export default {
    setup(){
       const editable = ref({})
       const router = useRouter()
    
        return {
            editable,
            async createProject(){
                try {
                    await projectsService.createProject(editable.value)
                    router.push({
                        name: 'Project',
                        params: {id: AppState.activeProject.id}
                    })
                     Modal.getOrCreateInstance(
              document.getElementById("create-project")
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