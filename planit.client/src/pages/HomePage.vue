<template>
 <div class="div" v-if="account.id">
   <div class="card p-4 m-5">
     <div class="row">
       <div class="col-6"><h3 class="text-changeh3">Projects</h3> </div>
       <div class="col-6 text-end">
         <button class="btn btn-primary"   data-bs-toggle="modal"
            data-bs-target="#create-project">
           Create Project</button>
       </div>
     </div>
     <div class="row mt-3 text-change">
       <div class="col-4">Name</div>
       <div class="col-4">Member</div>
       <div class="col-4">Started</div>
     </div>
     <div class="row p-3" v-for="p in projects" :key="p.id">
       <Project :project="p" />
     </div>
   </div>
   
 </div>
  <div class="div" v-else>
    <h1>Please Log in to continue...</h1>
  </div>
  <div class="div">
    <Modal id="create-project">
      <template #title> Create Project</template>
      <template #body><ProjectForm /> </template>
    </Modal>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
export default {
  name: 'Home',
   setup() {
    //  watchEffect(async ()=> {
      
    //      try {
          
    //         //  logger.log("i have an account", AppState.account)
    //          await projectsService.getProjects()
            
           
           
    //      } catch (error) {
    //        logger.error(error)
    //        Pop.toast(error.message, "error")
    //      }
       
    //  })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.text-change{
  font-family: 'Times New Roman', Times, serif;
  color: rgb(224, 123, 224);
  font-weight: bold;
}
.text-changeh3{
  font-family: 'Times New Roman', Times, serif;
  color: rgb(160, 29, 160);
  font-weight: bold;
}
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
