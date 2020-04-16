<template>
    <section class="modal-container flex center" v-if="photo">
        <img :src="photo.src.large" alt="photo" class="modal-photo" >
        <p class="modal-credit">Photographer: {{photo.photographer}}</p>
        <span class="close-modal" @click="closeModal">X</span>
        <div class="modal-bg-container" @click="closeModal"></div>
    </section>
</template>



<script>
export default {
    props: ["photo"],
    methods: {
        closeModal() {
            this.$emit('close-modal')
        }
    },
}

</script>


<style scoped>
    .modal-bg-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        z-index: -2;
    }
    .modal-container {
        width: 80vw;
        height: 80vh;
        position: fixed;
        top: 10vh;
        left: 10vw;
        background-color: black;
        z-index: 6;
        color: yellowgreen;
    }
    .modal-container:hover {
        cursor: default;
    }
    .modal-credit, .close-modal {
        padding: 0;
        margin: 0;
    }
    .modal-photo {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .modal-credit {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }
    .close-modal {
        position: fixed;
        top: 20px;
        right: 20px;
        color: orangered;
        font-weight: bold;
    }
    .close-modal:hover {
        cursor: pointer;
    }
</style>