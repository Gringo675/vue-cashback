<template>
    <div class="v-message modal-container" @click.self="message.disable">
        <div :class="'modal-form ' + message.type">
            <div class="modal-header">
                <div class="title">{{message.title}}</div>
                <div class="btn-close" @click="message.disable"></div>
            </div>
            <div class="modal-body">
                <div  v-html="message.text"></div>
                <div v-if="message.type === 'error'">


                    <div  class="nav">
                        <a href="" @click.prevent="showContacts = !showContacts">Свяжитесь с нами</a>
                    </div>
                    <div v-if="showContacts" class="contacts-block">
                        <p><button @click="this.$emit('showFeedbackForm')">Задать вопрос</button></p>
                        <p><a href="tel:+73517907748"><img :src="require(`@/assets/img/telephone.svg`)" alt="">+7 (351) 790-77-48</a></p>
                        <p><a href="mailto:info@chelinstrument.ru"><img :src="require(`@/assets/img/envelope.svg`)" alt="">info@chelinstrument.ru</a></p>
                    </div>


                </div>
            </div>
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
                showContacts: false
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

                .nav {
                    margin: 10px;
                }

                .contacts-block {
                    padding-left: 10px;

                    h3 {
                        text-align: center;
                    }
                    p {
                        margin: 5px;
                        text-align: center;
                    }

                    img {
                        margin-right: 10px;
                        position: relative;
                        top: 2px;
                    }
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