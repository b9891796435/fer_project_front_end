<template>
    <a-table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 10, current: current, total: total }"
        @change="atChange">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'PUBLISH_TIME'">
                {{ new Date(record.PUBLISH_TIME).toISOString() }}
            </template>
            <template v-if="column.key === 'DY_CONTENT'">
                <div @click="goDetail(record)">
                    {{ record.DY_CONTENT.length > 20 ? record.DY_CONTENT.slice(0, 20) + '...' : record.DY_CONTENT }}
                </div>
            </template>
            <template v-if="column.key === 'PIC_PATH'">
                {{ recognizeEmotion(record.PIC_PATH) }}
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import apis, { dynamicItemSummery, EMOTIONS } from '@/tools/apis'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const queryId = ref<number | null>(null)
const dataSource = ref<dynamicItemSummery[]>([]);
const current = ref(1);
const total = ref(0);
const atChange = (e:any) => query(e.current - 1).then(() => current.value = e.page)
const query = async (page: number) => {
    await apis.dynamicList({
        page
    }).then(res => {
        if (res.status == 'success') {
            dataSource.value = res.data.map(item => {
                item.PUBLISH_TIME *= 1000;
                return item
            })
            total.value = res.count;
        }
    })
}
const goDetail = (dynamic: dynamicItemSummery) => {
    router.push({ name: 'DynamicDetail', state: { cur_dynamic: { ...dynamic } } })
}
onMounted(() => {
    query(0)
})
const recognizeEmotion = (PIC_PATH: string) => {
    let temp = [], arr = PIC_PATH.split('.');
    for (let i in arr) if ((i as unknown as number) % 2 == 1) temp.push(Number(arr[i].replace(']', '')))
    const maxIndex = temp.indexOf(Math.max(...temp));
    return EMOTIONS[maxIndex]
}

const columns = [
    {
        dataIndex: 'DY_CONTENT',
        title: '动态内容',
        key: 'DY_CONTENT',
    },
    {
        dataIndex: 'NAME',
        title: '发布者',
        key: 'NAME',
    },
    {
        dataIndex: 'PIC_PATH',
        title: '心情',
        key: 'PIC_PATH',
    },
    {
        dataIndex: 'PUBLISH_TIME',
        title: '发布时间',
        key: 'PUBLISH_TIME',
    },
]

</script>
<style lang="less">
.pictureClass {
    height: 64px;
}
</style>