<template>
<form @submit.prevent="update">
<div class="row justify-content-center">
        <div class="col-4">
            <img :src="account.picture" alt="" class="profile-pic img-fluid">
        </div>
        <div class="col-8 text-center">
            <h2>{{account.name}}</h2>
            
        </div>
    </div>
    <div class="row p-3">
        <div class="col-6">
            <label for="">Name: </label>
            <input v-model="editable.name" type="text" name="" id="">
        </div>
        <div class="col-6">
            <label for="">Image: </label>
            <input v-model="editable.picture" type="text" name="" id="">
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
export default {
    setup(){
       const editable = ref({})
       watchEffect(()=> {
           editable.value = AppState.account
       })
        return {
            editable,
            account: computed(() => AppState.account),
            async update(){
                try {
                    
                    await accountService.update(editable.value)
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
.profile-pic {
    border-radius: 50%;
    border: 3px solid rgb(180, 43, 180);
    height: 20vh;
    width: 20vh;
}
</style>