<template>
  <div>
    <head-top></head-top>
    <div class="edit_container">
      <quill-editor v-model="content"
        ref="myQuillEditor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)">
      </quill-editor>
    </div>
    <div class="submit-btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import headTop from '@/components/headTop'
import {quillEditor} from 'vue-quill-editor'
export default {
  data () {
    return {
      content: '',
      editorOption:{}
    }
  },
  components: {
    headTop,
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady(editor){
      console.log('editor ready!', editor)
    },
    submit(){
      console.log(this.content);
      this.$message.success('提交成功！');
    }
  }
}
</script>
<style lang="less">
@import "../style/mixin.less";
.edit_container{
  padding: 40px;
  margin-bottom: 40px;
}
.editer{
  height: 450px;
}
.submit-btn{
  text-align: center;
}
</style>
