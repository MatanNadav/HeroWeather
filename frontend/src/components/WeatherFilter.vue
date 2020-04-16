<template>
    <section class="filter-container">
        <input class="filter-input" type="text" v-model="filterBy.txt" @keydown.enter="emitFilter" placeholder="City search">
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
            this.$emit('emit-filter', this.filterBy)
            this.filterBy = {txt: ''}
        }
    }
}
</script>

<style scoped>
    .filter-input {
        outline: none;
        padding: 0;
        margin: 0;
        text-align: center;
        height: 35px;
        font-weight: bold;
        font-family: cursive;
    }
</style>