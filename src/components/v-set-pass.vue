<template>
    <div class="v-set-pass modal-container" @click.self="customerPass.disableSetPass">
        <div class="modal-form">
            <div class="modal-header">
                <div class="title">Установка пароля</div>
                <div class="btn-close" @click="customerPass.disableSetPass"></div>
            </div>
            <div class="modal-body">
                <form @submit.prevent="setNewPass" id="set-pass-form">
                    <span>
                        <span class="col1">Введите пароль</span>
                        <span class="block-input-password">
                            <input :type="(showPass ? 'text' : 'password' )" v-model="pass1" ref="autofocus">
                            <img class="icon" @click="showPass = !showPass"
                                 :src="require(`@/assets/img/${(showPass ? 'eye-slash.svg' : 'eye.svg' )}`)"
                                 alt="">
                        </span>
                    </span>
                    <span>
                        <span class="col1">Повторите пароль</span>
                        <span class="block-input-password">
                            <input :type="(showPass ? 'text' : 'password' )" v-model="pass2" autofocus>
                            <img class="icon" @click="showPass = !showPass"
                                 :src="require(`@/assets/img/${(showPass ? 'eye-slash.svg' : 'eye.svg' )}`)"
                                 alt="">
                        </span>
                    </span>
                    <div v-if="warning.show" class="error-block"> {{warning.msg}} </div>
                </form>

            </div>
            <div class="modal-footer">
                <button @click="customerPass.disableSetPass" class="cancel">Отмена</button>
                <button type="submit" form="set-pass-form">OK</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "v-set-pass",
        components: {},
        props: {
            customerPass: Object
        },
        data() {
            return {
                pass1: '',
                pass2: '',
                showPass: false,
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
            setNewPass() {
                if (this.pass1.length < 4) {
                    this.warning.enable('Минимальная длина пароля 4 символа!');
                    return
                }
                if (this.pass1 !== this.pass2) {
                    this.warning.enable('Пароли не совпадают!');
                    return
                }
                this.customerPass.setNewValue(this.pass1);
                this.customerPass.disableSetPass();
            }
        },
        computed: {},
        watch: {},
        mounted() {
            let wrapper = document.getElementById('main-wrapper');
            let coord = wrapper.getBoundingClientRect();
            wrapper.style.cssText = `
                position: fixed;
                left: ${coord.left}px;
                top: ${coord.top}px;
            `;

            this.$refs.autofocus.focus();
        },
        unmounted() {
            let wrapper = document.getElementById('main-wrapper');
            let top = wrapper.getBoundingClientRect().top * (-1);
            wrapper.removeAttribute('style');
            window.scrollTo(0,top);
        }
    }
</script>

<style lang="scss">
    .v-set-pass {

        .col1 {
            display: inline-block;
            width: 150px;
        }

        .error-block {
            margin-top: 10px;
        }
    }

    #set-pass-form > span {
        display: inline-block;
        text-align: center;
    }
</style>