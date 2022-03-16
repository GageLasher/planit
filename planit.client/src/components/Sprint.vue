<template>
    

    

    

   <div class="col-8 bg-light rounded shadow p-2">{{sprint.name}}
      
           
       <button class="btn btn-outline-info ms-5" data-bs-toggle="modal"
            data-bs-target="#create-task">Add Task +</button>
      
           
       <i class="mdi mdi-delete selectable ms-5" @click="remove(sprint.id)" title="delete sprint"></i>
       

       </div>
    <div class="row" v-for="t in tasks" :key="t.id">

       <Task :task="t" />

    </div>

    <Modal id="create-task">
         <template #title> Add Task</template>
      <template #body><TaskForm /> </template>
        </Modal>

    


    


   
    
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { watchEffect } from '@vue/runtime-core'
import { tasksService } from '../services/TasksService'
export default {
    props: {
        sprint: {
            type: Object,
            required: true
        }
    },
    setup(){
        watchEffect(async () => {
            try {
                await tasksService.getTasks(AppState.activeProject.id)
            } catch (error) {
                logger.error(error.message)
                    Pop.toast(error.message, 'error')
            }
        })
        return {
            tasks: computed(() => AppState.tasks),
            async remove(id){
                try {
                        await sprintsService.remove(AppState.activeProject.id, id)
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