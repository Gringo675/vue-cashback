<template>
    <div class="v-want-more modal-container" @click.self="closeForm">
        <div class="modal-form">
            <div class="modal-header">
                <div class="title">Хочу больше!</div>
                <div class="btn-close" @click="closeForm"></div>
            </div>
            <div class="modal-body">
                <form v-if="!deliverySucsess" id="want-more-form" @submit.prevent="sendForm">
                    <div class="description">
                        Укажите сумму, которую хотели бы получить в качестве кешбэка, или опишите Ваше пожелание в сообщении. Возможно, мы сумеем договориться!
                    </div>
                    <table class="vm-table">
                        <tr>
                            <td>
                                Сумма, руб.
                            </td>
                            <td>
                                <input v-model.number="form.amount" type="number" ref="autofocus">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Сообщение
                            </td>
                            <td>
                                <textarea v-model="form.msg" rows="4"></textarea>
                            </td>
                        </tr>
                    </table>
                    <div v-if="warning.show" ref="warning" class="error-block">
                        {{warning.msg}}
                    </div>
                </form>
                <div v-else>
                        Сообщение отправленно! Мы рассмотрим его в ближайшее время. Вы можете продолжить заполнение формы
                 </div>
            </div>
            <div class="modal-footer">
                <template v-if="!deliverySucsess" >
                    <button class="cancel" @click="closeForm" type="button">Отмена</button>
                    <button type="submit" form="want-more-form">Отправить</button>
                </template>
                <template v-else>
                    <button @click="closeForm">OK</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-want-more",
        components: {},
        props: {
            billNumber: String,
            loader: Object
        },
        data() {
            return {
                form: {
                    amount: null,
                    msg: ''
                },

                warning: {
                    show: false,
                    msg: '',
                    enable(text) {
                        this.msg = text;
                        this.show = true;
                        this.scrollToWarning();
                    },
                    scrollToWarning: ()=> {
                        // при необходимости прокручивает блок, чтобы элемент с предупреждением был виден
                        // пришлось создать отдельную стрелочную функцию для доступа к внешнему this
                        setTimeout(()=>{this.$refs.warning.scrollIntoView({block: "nearest", behavior: "smooth"})},200);
                    }
                },

                deliverySucsess: false
            }
        },
        methods: {
            async sendForm() {
                if (!(this.form.amount > 0) && !this.form.msg.length) {
                    this.warning.enable('Пожалуйста укажите корректную сумму или оставьте Ваше пожелание в сообщении!');
                    return
                }
                this.loader.enable();
                try {
                    let url = 'https://chelinstrument.ru/api?app=cb&method=form_wantmore2';
                    // let url = 'http://localhost:3000/api?app=cb&method=form_wantmore';
                    let post = {
                        billNumber: this.billNumber,
                        amount: this.form.amount,
                        msg: this.form.msg
                    };
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(post)
                    });
                    if (response.ok) {
                        let result = await response.json();
                        if (result.statusCode === 200) {
                            // sucsess
                            this.deliverySucsess = true;
                        } else {
                            throw new Error();
                        }
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    this.warning.enable('Ошибка при обращении к серверу! Сообщение не отправлено. Попробуйте повторить операцию позже. При повторении ошибки пожалуйста сообщите нам о ней, отправив письмо на почту admin@chelinstrument.ru, или по телефону 8(351)790-77-48.');
                }
                this.loader.disable();
            },
            closeForm() {
                this.$emit('closeWantMore')
            },

        },
        computed: {},
        watch: {},
        mounted() {
            document.body.style.overflowY = 'hidden';
            this.$refs.autofocus.focus();
        },
        unmounted() {
            document.body.removeAttribute('style');
        }
    }
</script>

<style lang="scss">
    .v-want-more {

        & .description {
            border-radius: 10px;
            font-size: initial;
            padding: 10px;
        }

        & .vm-table {
            margin: 20px 0;

            & td:first-child {
                padding: 0 20px;
            }

            & input {
                width: 100px;
            }
        }
    }
</style>