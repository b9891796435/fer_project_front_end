<template>
    <div style="margin:12px">
        <a-modal v-model:visible="editVisible" title="修改信息" @ok="onSubmit">
            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" style="text-align: left;">
                <a-form-item label="昵称">
                    <a-input v-model:value="formState.NAME" />
                </a-form-item>
                <a-form-item label="年龄">
                    <a-input-number id="inputNumber" v-model:value="formState.AGE" :min="1" :max="120" />
                </a-form-item>
                <a-form-item label="性别">
                    <a-radio-group v-model:value="formState.SEX">
                        <a-radio value="M">男</a-radio>
                        <a-radio value="F">女</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="用户名">
                    <a-input v-model:value="formState.UNAME" />
                </a-form-item>
                <a-form-item label="密码">
                    <a-input v-model:value="formState.PASSWORD" />
                </a-form-item>
                <a-form-item label="权限码">
                    <a-input-number v-model:value="formState.autNum" />
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="queryVisible" title="查询记录" @ok="() => queryVisible = false"
            @cancel="() => queryVisible = false">
            <a-table :columns="queryColumns" :data-source="queryDataSource"
                :pagination="{ pageSize: 10, current: queryCurrent, total: queryTotal }" @change="atQueryChange">

                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'QUERYTIME'">
                        {{ new Date(record.QUERYTIME * 1000).toISOString() }}
                    </template>
                </template>
            </a-table>
        </a-modal>
        <a-table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 10, current: current, total: total }"
            @change="atChange">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button type="text" @click="handleEdit(record.USERID)">修改</a-button>
                    <a-button v-if="record.AUT_NUM > 0" type="text" @click="selectQuery(record.USERID)">查询记录</a-button>
                    <a-button type="text" @click="handleEdit(record.USERID)">注销</a-button>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import apis, { profileDetailForSuperItem, editProfileBodySuper, queryRecordItem } from '@/tools/apis'
import { message } from 'ant-design-vue';
const formState = ref<editProfileBodySuper>({
    userid: 0,
    NAME: '',
    AGE: 18,
    SEX: 'F',
    UNAME: '',
    PASSWORD: '',
    autNum: 0
});

const current = ref(1);
const total = ref(0);
const dataSource = ref<profileDetailForSuperItem[]>([]);
const atChange = (e: any) => query(e.current - 1).then(() => current.value = e.page)
const query = async (page: number) => {
    await apis.superProfile({
        page
    }).then(res => {
        if (res.status == 'success') {
            dataSource.value = res.data.profile
            total.value = res.data.count;
        }
    })
}
const handleEdit = (userid: number) => {
    let selected = dataSource.value.find(item => item.USERID == userid) as profileDetailForSuperItem
    formState.value = { ...selected, userid: selected.USERID, autNum: selected.AUT_NUM }
    editVisible.value = true;
}
const handleCancelAccount = (userid: number) => {
    if (window.confirm('该操作不可逆，是否确认注销？'))
        apis.cancelAccountSuper({ userid }).then(res => {
            if (res.status == 'success') {
                message.success('注销成功')
            }
        });
}
const onSubmit = () => {
    apis.editProfile({
        ...formState.value
    }).then(res => {
        if (res.status == 'success') {
            message.success('修改成功')
        }
        editVisible.value = false
        query(current.value - 1)
    });
};

const columns = [
    {
        dataIndex: 'NAME',
        title: '昵称',
        key: 'NAME',
    },
    {
        dataIndex: 'AGE',
        title: '年龄',
        key: 'AGE',
    },
    {
        dataIndex: 'SEX',
        title: '性别',
        key: 'SEX',
    },
    {
        dataIndex: 'UNAME',
        title: '用户名',
        key: 'UNAME',
    },
    {
        dataIndex: 'PASSWORD',
        title: '密码',
        key: 'PASSWORD',
    },
    {
        dataIndex: 'DONATION',
        title: '捐赠总额',
        key: 'DONATION',
    },
    {
        dataIndex: 'AUT_NUM',
        title: '权限组',
        key: 'AUT_NUM',
    },
    {
        title: '操作',
        key: 'action',
    },
]

const queryCurrent = ref(1);
const queryTotal = ref(0);
const selected_id = ref(0);
const queryDataSource = ref<queryRecordItem[]>([]);
const selectQuery = (userid: number) => {
    selected_id.value = userid;
    queryVisible.value = true;
    queryQuery(0, userid)
}
const atQueryChange = (e: any) => queryQuery(e.current - 1, selected_id.value).then(() => queryCurrent.value = e.page)
const queryQuery = async (page: number, userid: number) => {
    await apis.queryQueryRecord({
        page, userid
    }).then(res => {
        if (res.status == 'success') {
            queryDataSource.value = res.data.record
            queryTotal.value = res.data.count;
        }
    })
}
const queryColumns = [
    {
        dataIndex: 'QUERYID',
        title: '查询ID',
        key: 'QUERYID',
    },
    {
        dataIndex: 'QUERYTIME',
        title: '查询时间',
        key: 'QUERYTIME',
    }
]

onMounted(() => {
    query(0)
})



const editVisible = ref(false)
const queryVisible = ref(false)


const labelCol = { style: { width: '150px' } }, wrapperCol = { span: 14 }
</script>
<style lang="less">
.pictureClass {
    height: 64px;
}
</style>