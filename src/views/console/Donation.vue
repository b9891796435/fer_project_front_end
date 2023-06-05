<template>
    <div class="container">
        <a-input-number v-model:value="count"></a-input-number><a-button @click="donation">捐赠</a-button>
        <h3>感谢您对本网站的支持</h3>
    </div>
</template>
<script lang="ts" setup>
import apis from '@/tools/apis';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

const count = ref(0)
const donation = () => {
    if (count.value != 0)
        apis.donation({ count: count.value }).then(res => {
            if (res.status == 'success') {
                message.success('感谢您对本网站的支持')
            }
        })
}
</script>
<style>
.container {
    padding: 8px;
    height: 400px;
    backdrop-filter: blur(8px);
    background-color: #ffffff55;
    margin: 32px
}
</style>