<template>
    <div class="v-auth modal-container">
        <div class="modal-form">
            <div class="modal-header">
                <div class="title">Введите пароль</div>
            </div>
            <div class="modal-body">
                <form @submit.prevent="sendPass" class="enter-pass">
                    <div ref="inputForm">
                        <span class="block-input-password">
                            <input :type="(showPass ? 'text' : 'password' )" v-model="pass" ref="autofocus">
                            <img class="icon" @click="showPass = !showPass"
                                 :src="require(`@/assets/img/${(showPass ? 'eye-slash.svg' : 'eye.svg' )}`)"
                                 alt="">
                        </span>
                    </div>

                    <button type="submit">Отправить</button>
                </form>
                <div v-if="warning.show" class="error-block"> {{warning.msg}}</div>
                <div class="nav">
                    <a href="" @click.prevent="isForgetPass = !isForgetPass">Забыли пароль?</a>
                </div>
                <div  class="nav">
                    <a href="" @click.prevent="isHaveQuestion = !isHaveQuestion">Есть вопрос?</a>
                </div>
                <div v-if="isHaveQuestion" class="have-a-question">
                    <h3>Свяжитесь с нами:</h3>
                    <p><a href="tel:+73517907748"><img :src="require(`@/assets/img/telephone.svg`)" alt="">+7 (351) 790-77-48</a></p>
                    <p><a href="mailto:info@chelinstrument.ru"><img :src="require(`@/assets/img/envelope.svg`)" alt="">info@chelinstrument.ru</a></p>

                </div>
                <div v-if="isForgetPass" class="forget-pass">
                    <div class="description">Для вашей идентификации на указанный при активации пароля почтовый ящик
                        будет отправлено
                        письмо.
                    </div>
                    <div class="buttons">
                        <button @click="isForgetPass = false">Отмена</button>
                        <button @click="forgetPass">Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-auth",
        components: {},
        props: [
            'connectionStatus'
        ],
        data() {
            return {
                pass: '',
                showPass: false,
                isForgetPass: false,
                isHaveQuestion: false,
                errorMessage: '',
                warning: {
                    show: false,
                    msg: '',
                    enable(text) {
                        this.msg = text;
                        this.show = true
                    }
                },
            }
        },
        methods: {
            sendPass() {
                this.$emit('passReceived', this.pass)
            },
            forgetPass() {
                this.isForgetPass = false;
                this.$emit('forgetPass')
            }
        },
        computed: {},
        watch: {
            connectionStatus(value) {
                if (value === 'badPass') {
                    this.$refs.inputForm.classList.add('animation-error');
                    setTimeout(() => {
                        this.$refs.inputForm.classList.remove('animation-error');
                    }, 440);
                    this.warning.enable('Неверный пароль!');
                }
            }
        },
        mounted() {
            this.$refs.autofocus.focus();
            // this.$nextTick(() => this.$refs.autofocus.focus())
        },
    }
</script>

<style lang="scss">
    .v-auth {

        .enter-pass {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .error-block {
            margin: 10px auto;
        }

        .nav {
            margin: 10px;
        }

        .have-a-question {
            padding-left: 10px;

            h4 {
                margin-bottom: 5px;
            }
            p {
                margin: 5px;
            }

            img {
                margin-right: 10px;
                position: relative;
                top: 2px;
            }
        }

        .forget-pass {

            .description {
                margin: 10px 0;
                padding: 10px;
                font-size: initial;
                border-radius: 10px;
            }

            .buttons {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
        }

        .animation-error {
            animation: tremble .4s;

            input {
                border-color: red;
            }
        }
    }


</style>