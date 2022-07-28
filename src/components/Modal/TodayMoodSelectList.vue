<template>
  <article class="today-mood-item-wrapper" data-test="mood-list">
    <label v-for="mood in moods" :key="mood.id" data-test="today-mood-item">
      <input
          class="today-mood-radio"
          type="radio"
          v-model="todayMood"
          :value="mood.type"
          data-test="today-mood-radio"/>
      <span
          class="today-mood-label box-shadow"
          :class="mood.type"
          :data-test="`today-mood-${ mood.type }`">
        {{ mood.ment }}
      </span>
    </label>
  </article>

  <div class="footer" @click="saveMood" data-test="footer-button">일기도 쓸래요.</div>
</template>

<script>
import { mapMutations } from 'vuex';
import moodData from '@/assets/datas/moodData';

export default {
  name: 'MoodList',
  data() {
    return {
      moods: moodData,
      todayMood: '',
    };
  },
  methods: {
    ...mapMutations(['setTodayMood']),
    saveMood() {
      this.$store.commit('setTodayMood', this.todayMood);

      this.$emit('confirm');
    },
  },
};
</script>

<style lang="scss">
@import "src/style/color";

.today-mood-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 0;

  label {
    .today-mood-label {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 30vh;
      height: 5vh;
      margin-bottom: 20px;
      padding: 5px 0;
      border: 1px solid $border-color;
      border-radius: 20px;
      font-weight: bold;
    }

    &:last-child .today-mood-label {
      margin-bottom: 0;
    }
  }
}

.today-mood-radio {
  display: none;
}
.today-mood-radio:checked ~ .today-mood-label {

  &.happy {
    background: $happy;
  }
  &.excite {
    background: $excite;
  }
  &.angry {
    background: $angry;
  }
  &.worry {
    background: $worry;
  }
  &.depressed {
    background: $depressed;
  }
  &.peaceful {
    background: $peaceful;
  }
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 6vh;
  background: $black;
  color: $white;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
