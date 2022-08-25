<template>
  <div class="title-input">
    <label class="title">오늘 기분은</label>
    <input type="text" :value="todayMoodText" readonly>
  </div>

  <textarea class="diary" v-model="diaryContext"/>

  <div class="title-input">
    <p class="title">
      <font-awesome-icon
          icon="circle-check"
          class="todo-check"
          :class="this.$store.state.todayMood"/>
      <label>기분 todo를 추가하시겠어요?</label>
    </p>
    <input type="text" :value="moodTodo.content">
  </div>

  <div class="footer" @click="saveDiary" data-test="footer-button">저장</div>
</template>

<script>
export default {
  name: 'DiaryForm',
  data() {
    return {
      todayMoodText: 'sss',
      diaryContext: '',
      moodTodo: {
        content: '',
        isUse: false,
      },
    };
  },
  methods: {
    saveDiary() {
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/color";

.title-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;

  .title {
    padding-bottom: 15px;
    font-weight: bold;
  }

  input[type=text] {
    width: 100%;
    border: none;
    border-bottom: 1.5px solid $input-border-color;
    outline: none;

    &:focus {
      border-bottom: 1.5px solid $point;
    }
  }
}

.todo-check {

  &.happy {
    color: $happy;
  }
  &.excite {
    color: $excite;
  }
  &.angry {
    color: $angry;
  }
  &.worry {
    color: $worry;
  }
  &.depressed {
    color: $depressed;
  }
  &.peaceful {
    color: $peaceful;
  }

  &~label {
    margin-left: 5px;
  }

}

textarea.diary {
  width: 100%;
  min-height: 20vh;
  margin-bottom: 15px;
  border: 1px solid $input-border-color;
  overflow-y: scroll;
  outline-color: $point;
}

</style>
