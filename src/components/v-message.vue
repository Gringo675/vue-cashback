<template>
    <div class="v-message modal-container" @click.self="message.disable">
        <div :class="'modal-form ' + message.type">
            <div class="modal-header">
                <div class="title">{{message.title}}</div>
                <div class="btn-close" @click="message.disable"></div>
            </div>
            <div class="modal-body" v-html="message.text"></div>
            <div class="modal-footer">
                <button @click="message.disable">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
    // import usersData from "@/assets/test.json"

    export default {
        name: "v-message",
        components: {},
        props: [
            'message'
        ],
        data() {
            return {

                // ttest: require(`@/assets/test.json`),
                // ttest: usersData
            }
        },
        methods: {},
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">

    .v-message {

        .modal-form {

            &.error {
                border: 2px solid red;
            }
            &.sucsess {
                border: 2px solid green;
            }
        }
    }
</style>