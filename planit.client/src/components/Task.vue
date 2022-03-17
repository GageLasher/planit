<template>
<div class="p-2 col-8 bg-white rounded shadow m-2">

    <div class="row">
   <div class="col-8 d-flex">
       
       <input type="checkbox" v-model="task.isComplete" @change="save">
       <p class="ms-3"> {{task.name}} </p>
       <i class="mdi mdi-pencil selectable ms-5" title="edit task" data-bs-toggle="modal"
            :data-bs-target="`#edit-task` + task.id"></i>
       <i class="mdi mdi-delete selectable ms-5" @click="remove(task.id)" title="delete task"></i>
       
       </div>
      <div class="col-12">
           

           <p>{{new Date(task.createdAt).toDateString()}} </p>
           </div>
           <div class="col-12">
               <h4 class="purple">
                   {{notes.length}}
                   <a class="btn btn-primary" data-bs-toggle="offcanvas" :href="'#offcanvas' + task.id" role="button" aria-controls="offcanvasExample">
   <i class="mdi mdi-note-plus-outline selectable" title="view notes" > </i>
</a>
                  
                        

                       {{task.weight}}
               <i class="mdi mdi-weight"> </i>
                   
               </h4>
           </div>

    </div>
</div>
       <Modal :id="'edit-task' + task.id">
           <template #title> Edit Task</template>
      <template #body><EditTask :task="task" /> </template>
           </Modal>
           <OffCanvasNotes :task="task" :id="'offcanvas' + task.id"/>
  

</template>


<script>
import { computed } from '@vue/reactivity'
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
            notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
            async remove(id){
                try {
                    if(await Pop.confirm()){

                        await tasksService.remove(AppState.activeProject.id, id)
                    }
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, "error")
                }
            },
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
.purple {
    color: rgba(202, 65, 202, 0.795);
}
a{
    text-decoration: none;
    background-color: rgba(202, 65, 202, 0.795);
}
</style>