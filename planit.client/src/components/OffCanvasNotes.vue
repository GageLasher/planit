<template>
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasLabel">Notes</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
          
      <div class="row">
          <div class="col-12 d-flex flex-column">
              <form action="" @submit.prevent="addNote">

      <label for="">Add a note</label>
   <input type="text" v-model="editable.body" placeholder="note...">
              </form>
          </div>
          <div class="col-12 p-3" v-for="n in notes" :key="n.id">
              <Note :note="n" />
          </div>
      </div>
  </div>
</div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    setup(props){
       if(AppState.activeProject.id){

           watchEffect(async () => {
               try {
                   await notesService.getNotes(AppState.activeProject.id)
               
            } catch (error) {
                logger.error(error.message)
                    Pop.toast(error.message, 'error')
            }
            
        })
                }
        const editable = ref({})
        return {
            editable,
            notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
           async addNote(){
               try {
                //    logger.log(editable.value)
                   editable.value.taskId = props.task.id
                   await notesService.addNote(AppState.activeProject.id, editable.value)
                   editable.value = {}
                   
               } catch (error) {
                   logger.error(error)
                   Pop.toast(error.message, 'error')
               }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
h5 {
    color: rgb(173, 24, 173);
    text-decoration: underline;
}
</style>