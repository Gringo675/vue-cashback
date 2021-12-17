<template>
    <div class="v-footer">
        <div class="disclaimer">
            Ваши данные будут использоваться только по прямому назначению - для перечисления кешбэка.
            Мы гарантируем, что не будем использовать их в рекламных кампаниях или передавать третьим лицам.
            Нажимая кнопку "Сохранить", вы соглашаетесь с <a href="" @click.prevent="showRules">правилами оказания услуги</a>.
        </div>
        <div class="footer-batton">
            <button @click="this.$emit('setData')" class="large">Сохранить</button>
        </div>
        <div class="basement">
            <div class="columns">

                <div class="col1">
                    <p>Есть вопросы? Свяжитесь с нами!</p>
                    <button class="large" @click="this.$emit('showFeedbackForm')">Задать вопрос</button>
                    <p class="privacy"><a href="" @click.prevent="showPrivacyPolicy">Политика конфиденциальности</a></p>
                </div>

                <div class="col2">
                    <p>ООО ТД "Челябинский Инструмент"</p>
                    <p><img :src="require(`@/assets/img/house.svg`)" alt="">454084 Россия, г. Челябинск, ул. Болейко, 5</p>
                    <p><a href="https://chelinstrument.ru"><img :src="require(`@/assets/img/globe.svg`)" alt="">chelinstrument.ru</a></p>
                    <p><a href="tel:+73517907748"><img :src="require(`@/assets/img/telephone.svg`)" alt="">+7 (351) 790-77-48, 235-99-21</a></p>
                    <p><a href="mailto:info@chelinstrument.ru"><img :src="require(`@/assets/img/envelope.svg`)" alt="">info@chelinstrument.ru</a></p>
                </div>
            </div>
            <div class="copyright">
                Copyright © 2021 Все права защищены.
            </div>
        </div>
 </div>
</template>

<script>
    export default {
        name: "v-footer",
        components: {},
        props: {
            'message': Object
        },
        data() {
            return {
                 rules: undefined,
                privacy: undefined
            }
        },
        methods: {
            showRules() {
                this.rules = require(`@/assets/rules.json`);
                this.message.enable(this.rules.text, this.rules.title, 'info')
            },
            showPrivacyPolicy() {
                this.privacy = require(`@/assets/privacy.json`);
                this.message.enable(this.privacy.text, this.privacy.title, 'info')
            }
        },
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">

.v-footer {
    .disclaimer {
        padding: 10px;
        background: #eecbff;
        text-align: center;
    }

    .footer-batton {
        margin: 20px 0;
        width: 100%;

        & .large {
            display: block;
            margin: 0 auto;
            padding: 10px 80px;
            font-weight: bolder;
        }
    }

    .basement {
        background: #ffe0b3;
        padding: 10px 40px;

        & .columns {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-around;

            .col1 {
                font-size: 18px;
                margin: 0 10px;

                p {
                    text-align: center;

                    &.privacy {
                        margin: 10px 0 20px;
                    }
                }

                .large {
                    display: block;
                    margin: 10px auto;
                }
            }
            .col2 {

                 p:first-child {
                    text-decoration: underline;
                }

                 p {
                    margin-bottom: 5px;
                }

                 img {
                    margin-right: 10px;
                    position: relative;
                    top: 2px;
                }
            }
        }
        .copyright {
            margin: 10px 0;
            font-size: 14px;
        }
    }
}

</style>