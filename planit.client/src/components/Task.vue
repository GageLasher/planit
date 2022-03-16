<template>
   <div class="col-8 d-flex p-2 bg-white rounded shadow">
       <input type="checkbox" v-model="task.isComplete" @change="save">
       <p class="ms-3"> {{task.name}} </p>
       <i class="mdi mdi-delete selectable ms-5" @click="remove(sprint.id)" title="delete sprint"></i>
   </div>

</template>


<script>
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    setup(props){
        return {
            async save(){
                try {
                    await tasksService.edit(props.task)
                    
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