<template>
    <div class="v-loader-container">
        <div class="loader"></div>
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

<style>
    .v-loader-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #ffffffab;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: progress;
    }
    .loader {
        border-radius: 50%;
        border: 16px solid #aefbfb;
        border-right-color: #60ec60;
        border-bottom-color: #f7bd94;
        border-left-color: #f38ea0;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>