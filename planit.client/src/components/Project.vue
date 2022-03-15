<template>
 <div class="col-4">{{project.name}} </div>
 <div class="col-4"> 
     <img :src="project.creator.picture" alt="" class="img-fluid profile-picture">
 </div>
 <div class="col-4">{{new Date(project.createdAt).toDateString()}} </div>
</template>


<script>
export default {
    props: {
        project: {
            type: Object,
            required: true
        }
    },
    setup(props){
        return {}
    }
}
</script>


<style lang="scss" scoped>
.profile-picture{
    border-radius: 50%;
    height: 10vh;
    width: 10vh;
}
</style>