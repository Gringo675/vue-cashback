<template>
    <div class="v-modal-form">
        <h2>header: <slot name="header"></slot> </h2>
        <div>
            <slot name="body"></slot>
        </div>
        <div>
            <slot name="footer"></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "v-modal-form",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {},
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">

</style>