<template>
    <section class="filter-container flex center">
        <input class="filter-input" type="text" v-model="filterBy.txt" @keydown.enter="emitFilter" placeholder="City search">
        <button @click="emitFilter" class="search-btn"></button>
    </section>
</template>


<script>
export default {
    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },

    methods: {
        emitFilter() {
            let regex = /^[a-zA-Z][a-zA-Z\s]+$/
            if (this.filterBy.txt.match(regex)) {
                this.$emit('emit-filter', this.filterBy)
                this.filterBy = {txt: ''}
            }
        }
    }
}
</script>

<style scoped>
    .filter-container {
        width:100%;
    }
    .filter-input {
        outline: none;
        padding: 0;
        margin: 0;
        text-align: center;
        height: 35px;
        font-weight: bold;
    }
    .search-btn {
        padding: 0 5px;
        margin:  0 0 0 5px;
        outline: none;
        background: transparent;
        border: none;
        font-size: 28px;
        text-align: center;
        cursor: pointer;
    }
    .search-btn::after {
        content: '\279C'
    }
    @media screen and (max-width: 560px) {
        .filter-input {
            width: 60%
        }
    }
</style>