<template>
    <section class="photo-container" >
        <img :src="photo.src.medium" alt="thumb" @click="toggleModal">
        <Modal v-if="isModal" :photo="photo" @close-modal="toggleModal"></Modal>
    </section>
</template>

<script>
import Modal from "@/components/Modal"
export default {
    data() {
        return {
            isModal: false
        }
    },
    props: ["photo"],
    computed: {

    },
    methods: {
        toggleModal() {
            this.isModal = !this.isModal
        }
    },
    components: {
        Modal
    }

}
</script>

<style scoped>
    .photo-container {
        width: 100%;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }
    .photo-container:hover {
        cursor: pointer;
    }
    img {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5%;
    }
</style>