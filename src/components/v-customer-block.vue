<template>
    <div class="v-customer-block">
        <h3>Укажите Ваши данные</h3>
        <div class="customerName">
            <span>Укажите имя</span>
            <input type="text"
                   :value="customerName"
                   @change="$emit('update:customerName', $event.target.value)"/>
        </div>
        <div class="customerMail">
            <span>Укажите почту</span>
            <input type="text"
                   :value="customerMail"
                   @change="$emit('update:customerMail', $event.target.value)"/>
        </div>
        <div class="customerPhone">
            <span>Укажите номер телефона</span>
            <input type="tel"
                   :value="customerPhone"
                   @change="$emit('update:customerPhone', $event.target.value)"
                   ref="phone"/>
        </div>
    </div>
</template>

<script>
    import {Mask} from '@/assets/phoneMask.js';

    export default {
        name: "v-customer-block",
        components: {},
        props: [
            'customerName',
            'customerMail',
            'customerPhone'
        ],
        data() {
            return {}
        },
        methods: {},
        computed: {},
        watch: {},
        mounted() {
            // Маска на номер телефона
            let elem = this.$refs.phone;
            let mask = new Mask();
            elem.addEventListener("input", mask.create, false);
            elem.addEventListener("focus", mask.create, false);
            elem.addEventListener("click", mask.create, false);
            elem.addEventListener("keydown", mask.create, false);
        },
    }
</script>

<style lang="scss">

</style>