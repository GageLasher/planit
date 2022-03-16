<template>
    

    

    

   <div class="col-8 bg-light rounded shadow p-2">{{sprint.name}}
      
           
       <button class="btn btn-outline-info ms-5">Add Task +</button>
      
           
       <i class="mdi mdi-delete selectable ms-5" @click="remove(sprint.id)" title="delete sprint"></i>
       

       </div>


    


    


   
    
</template>


<script>
import { AppState } from '../AppState'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    props: {
        sprint: {
            type: Object,
            required: true
        }
    },
    setup(){
        return {

            async remove(id){
                try {
                        await sprintsService.remove(AppState.activeProject.id, id)
                } catch (error) {
                    logger.error(error.message)
                    Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>