<template>
    <span @mouseenter="tooltipEnter" @mouseleave="tooltipLeave" class="v-tooltip">
        <img :src="require(`@/assets/img/info.svg`)" alt="" class="tooltip-icon">
        <span class="tooltip-text"><span v-html="text"></span> </span>
    </span>
</template>

<script>

    export default {
        name: "v-tooltip",
        components: {},
        props: {
            text: String
        },
        data() {
            return {}
        },
        methods: {
            tooltipEnter(event) {
                let iconCoord = event.target.getBoundingClientRect();
                event.target.classList.add('show-tooltip');
                let windowWidth = document.documentElement.clientWidth;
                let tt = event.target.querySelector('.tooltip-text');
                let ttCoord = tt.getBoundingClientRect();
                if (windowWidth - iconCoord.right - ttCoord.width - 20 > 0) { // влезает справа

                    // вычисляем положение блока по высоте
                    let ttTop = -1*(ttCoord.height/2 - iconCoord.height/2); // идеальное положение
                    // проверяем снизу
                    let ttTopMin = Math.max(document.documentElement.clientHeight -ttCoord.height -10 - iconCoord.top, iconCoord.height + 10 - ttCoord.height);
                    ttTop = Math.min(ttTop, ttTopMin);
                    // проверяем сверху
                    let ttTopMax = Math.min(-1*(iconCoord.top -10), -10);
                    ttTop = Math.max(ttTop, ttTopMax);

                    tt.style.setProperty('--tt-top', ttTop + 'px');
                    tt.style.setProperty('--tt-right', (-1 * (ttCoord.width + 10)) + 'px');
                    event.target.style.setProperty('--triangle-before-transform', 'translateX(12px)');
                    event.target.style.setProperty('--triangle-after-transform', 'translateX(15px)');
                } else {
                    let styleRight = ttCoord.width / 2 - iconCoord.width / 2;
                    let maxRight = windowWidth - iconCoord.right - 5;
                    if (styleRight > maxRight) styleRight = maxRight;
                    tt.style.setProperty('--tt-right', (-1 * styleRight) + 'px');
                    if (iconCoord.top - ttCoord.height - 10 > 0) { // сверху
                        tt.style.setProperty('--tt-top', (-1 * (ttCoord.height + 10)) + 'px');
                        event.target.style.setProperty('--triangle-before-transform', 'rotate(-90deg) translateX(12px)');
                        event.target.style.setProperty('--triangle-after-transform', 'rotate(-90deg) translateX(15px)');
                    } else { // снизу
                        tt.style.setProperty('--tt-top', iconCoord.height + 10 + 'px');
                        event.target.style.setProperty('--triangle-before-transform', 'rotate(90deg) translateX(12px)');
                        event.target.style.setProperty('--triangle-after-transform', 'rotate(90deg) translateX(15px)');
                    }
                }

            },
            tooltipLeave(event) {
                event.target.classList.remove('show-tooltip');
                // event.target.removeAttribute("style");
                // event.target.querySelector('.tooltip-text').removeAttribute("style");
            }
        },
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">

    .tooltip-block {
        display: flex;
        align-items: center;
    }

    .v-tooltip {
        padding: 10px;
        position: relative;
        top: 1px;
        display: inline-block;

        .tooltip-icon {
            display: block;
        }

        .tooltip-text {
            display: none;
        }

        &.show-tooltip {
            .tooltip-text {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                box-sizing: border-box;
                width: 270px;
                min-height: 56px;
                padding: 10px;
                border: 2px solid #ac7019;
                background: #fff7eb;
                color: #9c4545;
                border-radius: 10px;
                font-size: 14px;
                line-height: normal;
                opacity: 1;
                z-index: 1;
                top: var(--tt-top, 0);
                right: var(--tt-right, 0);
            }

            &:before, &:after {
                content: "";
                position: absolute;
                border: 18px solid transparent;
                border-right: 18px solid #ac7019;
                top: 0;
                right: 0;
                z-index: 2;
                transform: var(--triangle-before-transform, rotate(45deg));
            }

            &:after {
                border-right: 18px solid #fff7eb;
                transform: var(--triangle-after-transform, rotate(45deg));
            }
        }
    }
    h2.tooltip-block {
        background: #ffc9af;
        padding: 5px 10px;
        border-radius: 10px;
        max-width: 420px;

        span:first-child {
            flex-basis: 100%;
        }
    }

    /*@media (max-width: 479px) {*/

    /*    h2.tooltip-block span:first-child {*/
    /*        flex-basis: 100%;*/
    /*    }*/
    /*}*/
</style>