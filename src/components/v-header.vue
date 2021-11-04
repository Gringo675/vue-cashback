<template>
    <div class="v-header">
        <div class="header-col1">
            <img class="big logo" :src="require(`@/assets/img/logoCI.png`)" alt="logo" >
        </div>
        <div class="header-col2">
                <div class="header-title">ЧЕЛЯБИНСКИЙ ИНСТРУМЕНТ</div>
                <div class="header-mail">
                    <a href="mailto:info@chelinstrument.ru">
                        <img class="icon" :src="require(`@/assets/img/envelope.svg`)" alt="" > info@chelinstrument.ru
                    </a>
                </div>
                <div class="header-phone">
                    <a href="tel:+73517907748">
                        <img class="icon" :src="require(`@/assets/img/telephone.svg`)" alt="" > +7 (351) 790-77-48
                    </a>
                </div>
      </div>
        <div class="header-col3">
            Кешбэк с покупки!
        </div>
        <div class="header-col4">
            <img class="big icon-cb" :src="require(`@/assets/img/icon-cb6.png`)" alt="cashback" >
        </div>
    </div>
    <div class="description">
        <div class="d-title">
            Заполните форму и получите вознаграждение!
        </div>
        <div class="d-text">
            Всё просто - укажите удобный Вам способ перевода - и мы перечислим часть суммы оплаченного счета.
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-header",
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
    .v-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        background: #ffe0b3;
        padding: 10px 0;

        & a {
            color: inherit;
        }

        & img.big {
            display: block;
            width: 120px;
        }

        & .header-col1 {

            & img.logo {
                /*width: 150px;*/
            }
        }

        & .header-col2 {

            & > div {
                padding-bottom: 10px;
            }

            & img.icon {
                width: 20px;
                margin-right: 10px;
                position: relative;
                top: 4px;
            }
            & .header-title {
                font-size: 28px;
            }

        }

        & .header-col3 {
            font-size: 34px;
            color: red;
            text-align: center;
            font-style: italic;
            text-decoration: underline;
        }

        & .header-col4 {
            & img.icon-cb {
                /*width: 150px;*/
            }
        }

    }

    .description {
        width: 100%;
        font-size: 18px;
        padding: 20px;
        background: #eecbff;
        line-height: 1.5em;
        text-align: center;

        & .d-title {
            font-size: 1.2em;
            color: #000000;
            margin-bottom: 5px;
        }
    }


    @media (max-width: 999px) {
        .v-header {
            flex-wrap: wrap;

            & .header-col2 > div {
                text-align: center;
            }

            & .header-col3 {
                order: 1;
                width: 100%;
            }
        }

    }

    @media (max-width: 767px) {
        .v-header {

            & img.big {
                width: 80px;
            }

            & .header-col2 {

                & > div {
                    padding-bottom: 3px;
                }

                & img.icon {
                    width: 16px;
                    top: 2px;
                }
                & .header-title {
                    font-size: 20px;
                }

            }
        }

        .description {
            font-size: 16px;
        }
    }

    @media (max-width: 479px) {
        .v-header {
            justify-content: space-evenly;

            & img.big {
                width: 70px;
            }

            & .header-col2 {

                & > div {
                    text-align: right;
                }

                & img.icon {
                    width: 14px;
                }
                & .header-title {
                    font-size: 16px;
                }

            }

            & .header-col3 {
                order: initial;
                width: auto;
                font-size: 26px;
            }

            & .header-col4 img.icon-cb {
                width: 40px;
            }
        }
    }

</style>