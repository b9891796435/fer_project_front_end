<template>
  <a-modal v-model:visible="visible" title="分享记录" @ok="pubDynamic">
    内容：
    <a-input v-model:value="content"></a-input>
  </a-modal>
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
    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button type="primary" html-type="submit" @click="onSubmit" style="margin-left: 100px;">确认更改</a-button>
    </a-form-item>
  </a-form>
  <a-table :columns="columns" :data-source="dataSource" style="margin: 0 64px;"
    :pagination="{ pageSize: 10, current: current, total: total }" @change="atChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'USE_TIME'">
        {{ new Date(record.USE_TIME * 1000).toISOString() }}
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="handleShare(record.RECORD_ID)">分享</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import apis, { profileItem, profileSuccessRes } from '@/tools/apis';
import { recordItem } from '@/tools/apis';
import { message } from 'ant-design-vue';
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
  {
    title: '操作',
    key: 'action',
  },
]
const formState = ref<profileItem>({
  NAME: '',
  AGE: 18,
  SEX: 'F',
  UNAME: '',
  PASSWORD: '',
});
const onSubmit = () => {
  apis.editProfile({
    ...formState.value
  }).then(res => {
    if (res.status == 'success') {
      message.success('修改成功')
    }
  });
};

const current = ref(1);
const total = ref(0);
const dataSource = ref<recordItem[]>([]);
const selected_id = ref(0);
const content = ref('')
const pubDynamic = () => {
  apis.pubDynamic({ content: content.value, recordId: selected_id.value })
  console.log({ content: content.value, recordId: selected_id.value })
  visible.value = false
}
const visible = ref(false)
const handleShare = (record_id: number) => {
  selected_id.value = record_id
  visible.value = true;
}
const getRec = async (page: number) => {
  await apis.profileRecord({ page }).then(res => {
    if (res.status == 'success') {
      dataSource.value = [...res.data.record];
      console.log(dataSource.value)
      total.value = res.data.count
    }
  })
}
const atChange = (e: any) => getRec(e.current - 1).then(() => current.value = e.page)
onMounted(() => {
  apis.profile({
    token: localStorage.getItem('auth') as string
  }).then(res => {
    if (res.status == 'success') {
      formState.value = res.data.profile;
    }
  })
  getRec(0)
})
const labelCol = { style: { width: '150px' } },
  wrapperCol = { span: 14 }
</script>
  
  