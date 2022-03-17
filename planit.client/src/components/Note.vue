<template>
    <div class="bg-white bordered rounded shadow p-2">
        <div class="d-flex">

        <img :src="note.creator.picture" alt="" class="img-fluid pp me-2">
         {{note.creator.email}} 
          <i class="mdi mdi-delete selectable ms-5" @click="remove(note.id)" title="delete note"></i>
        </div>
        <p> {{note.body}} </p>
    </div>
</template>


<script>
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    props: {
        note: {
            type: Object,
            required: true
        }
    },
    setup(){
        return {
            async remove(id){
                try {
                    if(await Pop.confirm()){

                        await notesService.remove(id)
                    }
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
.bordered {
    border: 2px solid rgb(190, 25, 190);
}
.pp {
    height: 5vh;
    width: 5vh;
    border: 2px solid rgb(190, 25, 190);
    border-radius: 50%;
    object-fit: cover;

}
</style>