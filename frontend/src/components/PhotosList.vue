<template>
    <section class="photo-list-container" v-if="photos" ref="body">
        <section class="photo-preview-container">
            <PhotoPreview v-for="photo in photos" :photo="photo" :key="photo.id"></PhotoPreview>
        </section>
        <button class="scroll-top"  @click="scrollToTop" :class="{ show: isActive }"><i class="arrow"></i></button>
        <footer class="footer" ref="footer"></footer>
    </section>
    
</template>

<script>
import PhotoPreview from "@/components/PhotoPreview"

export default {
    name:"PhotoList",
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
        handleScroll() {
            let rect = this.$refs.body.getBoundingClientRect()
            if (rect.y > 500) this.isActive = false
        }
    },
    mounted() {
        this.observer = new IntersectionObserver(this.handleIntersect, this.options);
        this.observer.observe(this.$refs.footer)
    },
    created(){
        window.addEventListener('scroll', this.handleScroll);
    },
     destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
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
        color: transparent;
        z-index: 4;
        outline: none;
    }
    .scroll-top:hover {
        cursor: pointer;
    }
    .show {
        display: block;
    }
    .arrow {
        position: fixed;
        bottom: 5%;
        right: 5%;
        border: solid black;
        border-width: 0 8px 8px 0;
        display: inline-block;
        padding: 10px;
        transform: rotate(-135deg);
    }

    .footer {
        width: 100%;
        height: 100px;
        background: transparent;
    }
</style>