<template>
   <div class="row pt-3">
       <div class="col-1 d-flex flex-column text-center">
           <div class="teemo">
               <h1 class="p-3">
                   <a  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  <i class="mdi mdi-folder" title="view projects"></i>
</a>
               
           </h1>
           </div>
           <div class="teemo mt-3">
           <h1 class="p-3">
               <i class="mdi mdi-cog"></i>
           </h1>
           </div>
       </div>
       <div class="col-11">
           <div class="row ms-3 mt-3">
               <div class="col-12"><h1> {{project.name}}  <i class="mdi mdi-delete selectable" @click="remove(project.id)" title="delete project"></i></h1> </div>
               <div class="col-12">{{project.description}} </div>
           </div>
       </div>
   </div>
   <div class="div">
       <OffCanvas id="offcanvasExample" />
   </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
export default {
    setup(){
        const route = useRoute()
        const router = useRouter()
        watchEffect(async () => {
            try {
                     if(route.name == "Project"){
                    await projectsService.getActiveProject(route.params.id)
                     }
            } catch (error) {
                logger.error(error.message)
                Pop.toast(error.message, "error")
            }
        })
        return {
            project: computed(() => AppState.activeProject),
            account: computed(() => AppState.account),
            async remove(id){
                try {
                    await projectsService.remove(id)
                    router.push({
                        name: 'Home',
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
.teemo{
    background-color: rgb(192, 33, 192);
}
a{
    text-decoration: none;
    color: black;
}
</style>