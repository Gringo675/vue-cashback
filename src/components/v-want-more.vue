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
                    Ваше пожелание отправленно! Мы постараемся удовлетворить его в ближайшее время.
                    Если сумма кешбэка изменится, это  отразится на данной странице.
                    А пока можете продолжить заполнение формы.
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
            loader: Object,
            API_SERVER: String
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
                    let url = this.API_SERVER + 'app=cb&method=form_wantmore';
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
                    this.warning.enable('Ошибка при обращении к серверу! Сообщение не отправлено. Возможно, это временные проблемы с сетью или на сервере. Попробуйте повторить отправку. При повторении ошибки пожалуйста сообщите нам о ней.');
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

        .description {
            border-radius: 10px;
            font-size: initial;
            padding: 10px;
        }

        .vm-table {
            margin-top: 20px;

            td:first-child {
                padding: 0 20px;
            }

            input {
                width: 150px;
            }
            textarea {
                width: 270px;
            }
        }
    }

    @media (max-width: 479px) {

        .v-want-more {

            .vm-table tr {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;

                td {
                    width: 100%;
                    text-align: center;

                    textarea {
                        margin: 10px 0;
                    }
                }


            }

        }

    }
</style>