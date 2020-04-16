<template>
    <nav class="nav-contianer flex row space-between center">
        <li class="nav-item flex align-center justify-center"><WeatherFilter @emit-filter="emitFilter"></WeatherFilter></li>
    </nav>
</template>

<script>
import WeatherFilter from "@/components/WeatherFilter"
export default {
    methods: {
        emitFilter(filterBy) {
            this.$emit('emit-filter', filterBy)
        }
    },
    components: {
        WeatherFilter
    }
}
</script>

<style scoped>
    .nav-contianer {
        list-style: none;
        padding: 0;
        width: 100%;
        height: 9%;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }
    .nav-item {
        width: 25%;
        height: 100%;
        margin: auto 0;
        padding: 0;
    }
</style>