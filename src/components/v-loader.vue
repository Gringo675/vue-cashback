<template>
    <div class="modal-container loader">
        <div class="spinner"></div>
    </div>
</template>

<script>
    export default {
        name: "v-loader",
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
    .loader {
        z-index: 1040;
        justify-content: center;
        cursor: progress;

        & .spinner {
            border-radius: 50%;
            border: 16px solid #2578fb;
            border-right-color: #42ecc8;
            border-bottom-color: #f7ef72;
            border-left-color: #f34a5f;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>