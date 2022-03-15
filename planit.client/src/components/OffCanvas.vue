<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasLabel">Projects</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
   <div class="div" v-for="p in projects" :key="p.id">
     <div class="row p-2 selectable" @click="setProject(p.id)"  data-bs-dismiss="offcanvas">
         <div class="col-6">{{p.name}} </div>
         <div class="col-6">{{ new Date(p.createdAt).toDateString()}} </div>
         </div>  
   </div>
  </div>
</div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const router = useRouter()
        return {
            projects: computed(() => AppState.projects),
            async setProject(id){
                try {
                    await projectsService.getActiveProject(id)
                    router.push({
                        name: "Project",
                        params: {id: AppState.activeProject.id}
                    })
                    
                } catch (error) {
                    logger.error(error.message)
                    Pop.toast(error.message, "error")
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>