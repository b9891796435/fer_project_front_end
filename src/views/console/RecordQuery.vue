<template>
    <label>请输入所查询的ID：</label>
    <a-input-number v-model:value="queryId"></a-input-number>
    <a-button type="submit" @click="query(0)">查询</a-button>
    <a-table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 10, current: current, total: total }"
        @change="atChange">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'USE_TIME'">
                {{ new Date(record.USE_TIME).toISOString() }}
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import apis, { recordItem, EMOTIONS } from '@/tools/apis'
import { message } from 'ant-design-vue';
const current = ref(1);
const total = ref(0);
const atChange = (e: any) => query(e.current - 1).then(() => current.value = e.page)
const queryId = ref<number | null>(null)
const dataSource = ref<recordItem[]>([]);
const query = async (page: number) => {
    if (!queryId.value) {
        message.error('请输入所查询的ID')
        return;
    } else {
        await apis.queryRecord({
            userId: queryId.value,
            page
        }).then(res => {
            dataSource.value = res.data.map(item => {
                item.USE_TIME *= 1000;
                let temp = [], arr = item.PIC_PATH.split('.');
                for (let i in arr) if ((i as unknown as number) % 2 == 1) temp.push(Number(arr[i].replace(']', '')))
                const maxIndex = temp.indexOf(Math.max(...temp));
                item.PIC_PATH = EMOTIONS[maxIndex]
                return item
            })
            total.value=res.count
        })
    }
}
const columns = [
    {
        dataIndex: 'RECORD_ID',
        title: '记录ID',
        key: 'Key',
    },
    {
        dataIndex: 'USERID',
        title: '识别用户ID',
        key: 'USERID',
    },
    {
        dataIndex: 'USE_TIME',
        title: '识别时间',
        key: 'USE_TIME',
    },
    {
        dataIndex: 'PIC_PATH',
        title: '识别结果',
        key: 'PIC_PATH',
    },
]

</script>
<style lang="less">
.pictureClass {
    height: 64px;
}
</style>