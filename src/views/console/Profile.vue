<template>
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
</template>
<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue';
import apis, { profileRes } from '@/tools/apis';
import type { UnwrapRef } from 'vue';
export default defineComponent({
  setup() {
    const formState = ref<profileRes>({
      NAME: '',
      AGE: 18,
      SEX: 'F',
      UNAME: '',
      PASSWORD: '',
    });
    const onSubmit = () => {
      apis.editProfile({
        token: localStorage.getItem('auth') as string,
        ...formState.value
      });
    };
    return {
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
    };
  },
  mounted() {
    apis.profile({
      token: localStorage.getItem('auth') as string
    }).then(res => {
      this.formState = res
    })
  }
});
</script>
  
  