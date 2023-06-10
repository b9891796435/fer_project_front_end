<template>
    <div class="container">
        <div v-for="item in dataSource" class="item">
            <div class="header">
                <div>发帖人：{{ item.NAME }}</div>
                <div><like-outlined
                        @click="() => 'DY_CONTENT' in item ? like_dynamic(item.DYNAMIC_ID) : like_comment(item.COMMENT_ID)" />{{
                            item.LIKE_COUNT }}</div>
                <div v-if="'DY_CONTENT' in item">{{ mainEmotion }}</div>
                <div v-if="role >= 1 && 'DY_CONTENT' in item" @click="deleteDynamic" style="cursor: pointer;">删除动态</div>
            </div>
            <div class="content">{{ 'DY_CONTENT' in item ? item.DY_CONTENT : item.COMMENT_CONTENT }}</div>
        </div>
        第{{ page + 1 }}/{{ total }}页<a-button @click="pageBefore">上一页</a-button><a-button @click="pageAfter">下一页</a-button>
        <div class="comment-block">
            评论：
            <a-textarea v-model:value="comment" :cols="30" :rows="10"></a-textarea>
            <a-button @click="pubComment">发送</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import apis, { dynamicItemSummery, commentItem, EMOTIONS } from '@/tools/apis';
import { message } from 'ant-design-vue';
import { LikeOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const dataSource = ref<(dynamicItemSummery | commentItem)[]>([history.state.cur_dynamic]);
const page = ref(0);
const count = ref(0);
const comment = ref('')
const total = computed(() => {
    return Math.ceil(count.value / 10)
})
const role = Number(localStorage.getItem('role'))
const getComment = async (page: number) => {
    await apis.dynamicDetail({ dynamicID: history.state.cur_dynamic.DYNAMIC_ID, page }).then(res => {
        if (res.status == 'success') {
            dataSource.value = res.data,
                count.value = res.count
        }
    }).then(() => {
        if (page == 0) {
            dataSource.value = [history.state.cur_dynamic, ...dataSource.value]
        }
    })
}
const deleteDynamic = () => {
    apis.deleteDynamic({ dynamicID: history.state.cur_dynamic.DYNAMIC_ID }).then(res => {
        if (res.status == 'success') {
            message.success('操作成功')
            router.push('DynamicList');
        }
    })
}
const pageBefore = () => {
    if (page.value == 0) {
        message.error('已经是第一页')
    } else {
        getComment(page.value - 1).then(() => page.value--)
    }
}
const pageAfter = () => {
    if (page.value >= total.value - 1) {
        message.error('已经是最后一页')
    } else {
        getComment(page.value + 1).then(() => page.value++)
    }
}
const like_comment = (commentID: number) => {
    apis.likeComment({ commentID }).then(res => {
        if (res.status == 'success') {
            let index = dataSource.value.findIndex((item) => (item as commentItem).COMMENT_ID == commentID);
            (dataSource.value[index] as commentItem).LIKE_COUNT += 1;
        } else {
            message.error('您已点赞过此内容')
        }
    })
}
const like_dynamic = (dynamicID: number) => {
    apis.likeDynamic({ dynamicID }).then(res => {
        if (res.status == 'success') {
            dataSource.value[0].LIKE_COUNT += 1;
        } else {
            message.error('您已点赞过此内容')
        }
    })
}
const pubComment = () => {
    if (comment.value != '')
        apis.pubComment({ dynamicID: (history.state.cur_dynamic as dynamicItemSummery).DYNAMIC_ID, content: comment.value }).then(res => {
            if (res.status == 'success') {
                comment.value = '';
                message.success('评论成功');
                getComment(page.value)
            }
        })
}
const mainEmotion = computed(() => {
    let temp = [], arr = history.state.cur_dynamic.PIC_PATH.split('.');
    for (let i in arr) if ((i as unknown as number) % 2 == 1) temp.push(Number(arr[i].replace(']', '')))
    const maxIndex = temp.indexOf(Math.max(...temp));
    console.log(EMOTIONS[maxIndex])
    return EMOTIONS[maxIndex]
})
onMounted(() => {
    getComment(0)
})
</script>
<style lang="less" scoped>
.container {
    padding: 16px;
    text-align: left;
    height: fit-content;
}

.item {
    padding: 0;
    margin: 32px 0
}

.header {
    display: flex;
    background-color: rgb(var(--green-3));

    >div {
        margin: 0 8px
    }
}

.comment-block {
    margin: 8px 0
}
</style>