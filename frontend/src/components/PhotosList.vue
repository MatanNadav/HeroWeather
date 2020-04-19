<template>
    <section class="photo-list-container" v-if="photos">
        <section class="photo-preview-container">
            <PhotoPreview v-for="photo in photos" :photo="photo" :key="photo.id"></PhotoPreview>
        </section>
        <button class="scroll-top" @click="scrollToTop" :class="{ show: isActive }">Back to top</button>
        <footer class="footer" ref="footer"></footer>
    </section>
    
</template>

<script>
import PhotoPreview from "@/components/PhotoPreview"

export default {
    data() {
        return {
            options: {root: null, rootMargins: "0px", threshold: 0.5},
            observer: null,
            isActive: false
        }
    },
    props: ["photos"],
    methods: {
        handleIntersect(entries) {
            if (entries[0].isIntersecting) {
                this.$store.dispatch({ type: "fetchNextPage" })
                this.isActive = true
            }
            else return
        },
        scrollToTop() {
            window.scrollTo({
                top:0,
                right:0,
                behavior: "smooth"
            })
            this.isActive = false
        },
    },
    mounted() {
        this.observer = new IntersectionObserver(this.handleIntersect, this.options);
        this.observer.observe(this.$refs.footer)
    
    },
    components: {
        PhotoPreview,
    },

}
</script>

<style scoped>
    .photo-list-container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .photo-preview-container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-auto-rows: 250px;
        gap: 10px 10px;
    }
    @media screen and (max-width: 560px) {
        .photo-preview-container {
            width: 90%;
            grid-template-columns: 1fr;
            margin: 0 auto;
        }
    }

    .scroll-top {
        display: none;
        font-family: cursive;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 35px;
        color: black;
        background: rgb(153, 89, 43);
        font-size: 1.5rem;
        z-index: 4;
        outline: none;
    }
    .scroll-top:hover {
        cursor: pointer;
    }
    .show {
        display: block;
    }

    .footer {
        width: 100%;
        height: 100px;
        background: transparent;
    }
</style>