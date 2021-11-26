<template>
    <div class="v-feedback-form modal-container" @click.self="closeForm">
        <div class="modal-form">
            <div class="modal-header">
                <div class="title">Обратная связь</div>
                <div class="btn-close" @click="closeForm"></div>
            </div>
            <div class="modal-body">
                <form v-if="!deliverySucsess" id="feedback-form" @submit.prevent="sendForm">
                    <div class="description">
                        Воспользуйтесь данной формой, чтобы задать нам вопрос или отправить пожелание.
                    </div>
                    <table class="ff-table">
                        <tr>
                            <td>
                                Имя
                            </td>
                            <td>
                                <input v-model.number="form.name" type="text" ref="autofocus" placeholder="Как к Вам обращаться">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Почта
                            </td>
                            <td>
                                <input v-model.number="form.mail" type="text" placeholder="E-mail для ответа"
                                       @input="emailValidation">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Сообщение
                            </td>
                            <td>
                                <textarea v-model="form.msg" rows="4" placeholder="Опишите тему обращения"></textarea>
                            </td>
                        </tr>
                    </table>
                    <div v-if="warning.show" ref="warning" class="error-block">
                        {{warning.msg}}
                    </div>
                </form>
                <div v-else>
                    Сообщение отправленно! Мы рассмотрим его в ближайшее время.
                </div>
            </div>
            <div class="modal-footer">
                <template v-if="!deliverySucsess" >
                    <button class="cancel" @click="closeForm" type="button">Отмена</button>
                    <button type="submit" form="feedback-form">Отправить</button>
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
        name: "v-feedback-form",
        components: {},
        props: {
            API_SERVER: String,
            billNumber: String,
            name: String,
            mail: String,
            loader: Object
        },
        data() {
            return {
                form: {
                    name: this.name,
                    mail: this.mail,
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
            emailValidation(event) {
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
                    event.target.classList.add('input-complete');
                }
                else {
                    event.target.classList.remove('input-complete');
                }
            },
            async sendForm() {
                if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.form.mail))) {
                    this.warning.enable('Пожалуйста укажите корректный адрес электронной почты! Иначе мы не сможем Вам ответить.');
                    return
                }
                if (this.form.msg.length === 0) {
                    this.warning.enable('Пожалуйста напишите сообщение!');
                    return
                }
                this.loader.enable();
                try {
                    let url = this.API_SERVER + 'app=cb&method=form_feedback';

                    let post = {
                        billNumber: this.billNumber,
                        name: this.form.name,
                        mail: this.form.mail,
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
                    this.warning.enable('Ошибка при обращении к серверу! Сообщение не отправлено. Возможно, это связано со временным сбоем в работе сети или сервера. Попробуйте повторить операцию позже. При повторении ошибки пожалуйста сообщите нам о ней.');
                }
                this.loader.disable();
            },
            closeForm() {
                this.$emit('closeFeedbackForm')
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
    .v-feedback-form {

        .description {
            border-radius: 10px;
            font-size: initial;
            padding: 10px;
        }

        .ff-table {
            margin-top: 20px;

            td:first-child {
                padding: 0 20px;
            }

            input, textarea {
                width: 270px;
            }
        }
    }

    @media (max-width: 479px) {

        .v-feedback-form {

            .ff-table tr {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;

                td {
                    width: 100%;
                    text-align: center;

                    input, textarea {
                        margin: 10px 0;
                    }
                }
            }
        }
    }
</style>