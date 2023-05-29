<template>
    <div id="dashBoard">
        <floating-card>
            <div id="navigationSider">
                <div @click="navigationFunc('Fer')" style="margin-top:120px" v-if="role >= 0">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 fPsHiw svg-icon-path-icon"
                        viewBox="0 0 1024 1024" width="30" height="30">
                        <defs data-reactroot=""></defs>
                        <g>
                            <path
                                d="M384 547.2H128a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64z m-21.333333 298.666667H149.333333v-213.333334h213.333334zM384 56.533333H128a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64z m-21.333333 298.666667H149.333333v-213.333333h213.333334zM597.333333 440.533333h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64H597.333333a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64z m21.333334-298.666666h213.333333v213.333333H618.666667zM727.466667 845.866667H618.666667v-213.333334h213.333333v107.733334a10.666667 10.666667 0 0 0 10.666667 10.666666h64a10.666667 10.666667 0 0 0 10.666666-10.666666v-133.973334a59.093333 59.093333 0 0 0-59.306666-59.093333h-264.533334A59.306667 59.306667 0 0 0 533.333333 606.293333v265.6a59.52 59.52 0 0 0 59.306667 59.306667h134.826667a10.666667 10.666667 0 0 0 10.666666-10.666667v-64a10.666667 10.666667 0 0 0-10.666666-10.666666z"
                                p-id="1777"></path>
                            <path
                                d="M817.28 769.92a10.666667 10.666667 0 0 0-15.146667 0l-45.226666 45.226667a10.666667 10.666667 0 0 0 0 14.933333l134.4 134.4a10.666667 10.666667 0 0 0 14.933333 0L960 911.573333z"
                                p-id="1778"></path>
                        </g>
                    </svg>
                    <div>
                        情绪识别
                    </div>
                </div>
                <div @click="navigationFunc('Profile')" v-if="role >= 0">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 fPsHiw svg-icon-path-icon"
                        viewBox="0 0 1024 1024" width="30" height="30">
                        <defs data-reactroot=""></defs>
                        <g>
                            <path
                                d="M384 547.2H128a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64z m-21.333333 298.666667H149.333333v-213.333334h213.333334zM384 56.533333H128a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64z m-21.333333 298.666667H149.333333v-213.333333h213.333334zM597.333333 440.533333h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64H597.333333a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64z m21.333334-298.666666h213.333333v213.333333H618.666667zM727.466667 845.866667H618.666667v-213.333334h213.333333v107.733334a10.666667 10.666667 0 0 0 10.666667 10.666666h64a10.666667 10.666667 0 0 0 10.666666-10.666666v-133.973334a59.093333 59.093333 0 0 0-59.306666-59.093333h-264.533334A59.306667 59.306667 0 0 0 533.333333 606.293333v265.6a59.52 59.52 0 0 0 59.306667 59.306667h134.826667a10.666667 10.666667 0 0 0 10.666666-10.666667v-64a10.666667 10.666667 0 0 0-10.666666-10.666666z"
                                p-id="1777"></path>
                            <path
                                d="M817.28 769.92a10.666667 10.666667 0 0 0-15.146667 0l-45.226666 45.226667a10.666667 10.666667 0 0 0 0 14.933333l134.4 134.4a10.666667 10.666667 0 0 0 14.933333 0L960 911.573333z"
                                p-id="1778"></path>
                        </g>
                    </svg>
                    <div>
                        个人中心
                    </div>
                </div>
                <div @click="navigationFunc('QueryRecord')" v-if="role >= 1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 fPsHiw svg-icon-path-icon"
                        viewBox="0 0 1024 1024" width="30" height="30">
                        <defs data-reactroot=""></defs>
                        <g>
                            <path
                                d="M384 547.2H128a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64z m-21.333333 298.666667H149.333333v-213.333334h213.333334zM384 56.533333H128a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64z m-21.333333 298.666667H149.333333v-213.333333h213.333334zM597.333333 440.533333h256a64 64 0 0 0 64-64v-256a64 64 0 0 0-64-64H597.333333a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64z m21.333334-298.666666h213.333333v213.333333H618.666667zM727.466667 845.866667H618.666667v-213.333334h213.333333v107.733334a10.666667 10.666667 0 0 0 10.666667 10.666666h64a10.666667 10.666667 0 0 0 10.666666-10.666666v-133.973334a59.093333 59.093333 0 0 0-59.306666-59.093333h-264.533334A59.306667 59.306667 0 0 0 533.333333 606.293333v265.6a59.52 59.52 0 0 0 59.306667 59.306667h134.826667a10.666667 10.666667 0 0 0 10.666666-10.666667v-64a10.666667 10.666667 0 0 0-10.666666-10.666666z"
                                p-id="1777"></path>
                            <path
                                d="M817.28 769.92a10.666667 10.666667 0 0 0-15.146667 0l-45.226666 45.226667a10.666667 10.666667 0 0 0 0 14.933333l134.4 134.4a10.666667 10.666667 0 0 0 14.933333 0L960 911.573333z"
                                p-id="1778"></path>
                        </g>
                    </svg>
                    <div>
                        查询记录
                    </div>
                </div>
                <div @click="() => router.push('/')">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 fPsHiw svg-icon-path-icon fill"
                        viewBox="0 0 32 32" width="30" height="30">
                        <defs data-reactroot=""></defs>
                        <g>
                            <path
                                d="M6.667 29.333c-0.736 0-1.333-0.597-1.333-1.333v0-24c0-0.736 0.597-1.333 1.333-1.333v0h18.667c0.736 0 1.333 0.597 1.333 1.333v0 4h-2.667v-2.667h-16v21.333h16v-2.667h2.667v4c0 0.736-0.597 1.333-1.333 1.333v0h-18.667zM24 21.333v-4h-9.333v-2.667h9.333v-4l6.667 5.333-6.667 5.333z">
                            </path>
                        </g>
                    </svg>
                    退出
                </div>
            </div>
        </floating-card>
        <div id="viewContainer">
            <floating-card>
                <router-view></router-view>
            </floating-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FloatingCard from '@/components/FloatingCard.vue';
import { UpOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const navigationFunc = (to: string) => {
    router.push(to)
}
const collapseClass = ref('collapse');
const toggleCollapse = () => {
    collapseClass.value === 'collapse' ? collapseClass.value = 'collapse end' : collapseClass.value = 'collapse';
}
const role = ref(0);
const roleNow = localStorage.getItem('role');
console.log(roleNow)
role.value = !isNaN(Number(roleNow)) ? Number(roleNow) : 0

</script>
<style lang="less" scoped>
#dashBoard {
    display: flex;
    flex-direction: row;
    margin: auto;
    width: 1100px;
  background-color: rgba(240, 245, 255,05);
  min-height: 100vh;
    min-width: 100vw;
    padding:12px 64px
}

#navigationSider {
    z-index: 1;
    color: #000;
    border-radius: 30px;
    min-width: 160px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none
}

#navigationSider .item,
#navigationSider>div {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding-left: 12px;
    margin-bottom: 76px;
    cursor: pointer
}

#navigationSider .item svg,
#navigationSider>div svg {
    margin: 8px;
}

#navigationSider>.container {
    align-items: unset;
    flex-direction: column;
    padding: 0
}

#viewContainer {
    width: calc(100% - 180px);
    margin: 28px;
}

svg {
    fill: #000
}

.collapse {
    transition-duration: .5s;
    transition-timing-function: ease-in-out;
    height: 0;
    overflow: hidden;
    background-color: #0c7612;
    width: 100%;
    padding-left: 36px
}

.collapse>div {
    margin-bottom: 12px
}

.collapse.end {
    height: 160px;
    padding: 18px 0 0 36px
}

.divider {
    height: 1px;
    margin: 4px 0;
    background-color: #fff
}
</style>