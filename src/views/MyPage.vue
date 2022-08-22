<template>
  <div class="title-wrapper">
    <h2 class="pg-title">마이페이지</h2>
    <!--<div>마이 설정</div>-->
  </div>

  <MyPageContents />
</template>

<script>
// eslint-disable-next-line no-unused-vars,import/extensions
import MyPageContents from '@/components/MyPage/MyPageContents';

export default {
  name: 'MyPage',
  props: {},
  components: {
    MyPageContents,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "src/style/common";

</style>
