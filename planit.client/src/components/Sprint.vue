<template>
   <div class="col-6">{{sprint.name}} </div>
   <div class="col-6"> <button class="btn btn-outline-info">Add Task +</button> </div>
</template>


<script>
export default {
    props: {
        sprint: {
            type: Object,
            required: true
        }
    },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>