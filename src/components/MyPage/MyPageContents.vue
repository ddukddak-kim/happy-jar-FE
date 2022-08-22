<template>
  <div class="item-wrapper">
    <div class="item">
      <p>앱버전</p>
      <span>{{appVer}}</span>
    </div>
    <div class="item">
      <p>로그아웃</p>
    </div>
    <div class="item">
      <p>자주 묻는 질문</p>
    </div>
    <div class="item">
      <p>잠금 설정</p>
      <span v-if="isLocked">on</span>
      <span v-else>off</span>
    </div>
    <div class="item">
      <p>데이터 초기화</p>
    </div>
    <div class="item">
      <p>만든 사람들</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPageContents',
  props: {},
  data() {
    return {
      appVer: 'v 1.0.0',
      isLocked: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin: auto;
  width: 90%;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 0.85vw;
  font-size: 2.3vh;
  align-items: center;
  flex-basis: auto;
  flex-grow: 0;
}
.item > :not(:first-child):last-child {
  color: #979797;
}
.item p:only-child {
  display: contents;
}
.item p:only-child:after {
  content: '>';
  margin-left: 0.1125vw;
  color: #979797;
}
</style>
