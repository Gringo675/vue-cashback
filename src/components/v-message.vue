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
                border: 1px solid #f55555;

                .modal-header {
                    background: #ffa5a5;
                }
            }
            &.sucsess {
                border: 1px solid #b4ebe0;

                .modal-header {
                    background: #c6fff4;
                }
            }
        }
    }
</style>