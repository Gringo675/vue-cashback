<template>
    <div class="v-auth">
        <h4>Для авторизации необходимо ввести пароль</h4>
        <div>
            <form @submit.prevent="sendPass">
                <input type="text" v-model="pass" autofocus>
                <input type="submit" value="Отправить">
            </form>


        </div>
        <div>{{mess}}</div>
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
                pass: ''
            }
        },
        methods: {
            sendPass() {
                this.$emit('passReceived', this.pass)
            }
        },
        computed: {
            mess() {
                if (this.connectionStatus === 'badPass') {
                    return 'Неверный пароль!'
                }
                return ''
            }
        },
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">

</style>