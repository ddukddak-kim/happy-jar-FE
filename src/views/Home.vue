<template>
  <div data-test="home-wrapper">
    <Calendar data-test="calendar" />

    <PreMoodContents v-if="!todayMood.isSave"/>
    <AfterMoodContents v-else/>

    <button
        class="edit"
        data-test="mood-edit-button"
        @click="openModal">
      <font-awesome-icon icon="edit" class="fa-xl" />
    </button>
    <div class="home-background" :class="this.$store.state.todayMood"></div>
  </div>

  <AddMood
      v-if="modal.isVisible"
      modalType="modal.type"
      @close="closeModal">
    <template v-slot:header>오늘의 기분</template>
    <template v-slot:body>
      <TodayMoodSelectList
          v-if="isSelectModal"
          @confirm="openDiaryForm"/>
      <div v-if="isDiaryForm">
        next step modal
      </div>
    </template>
  </AddMood>
</template>

<script>
import AddMood from '@/components/Modal/Modal.vue';
import Calendar from '@/components/Home/Calendar.vue';
import PreMoodContents from '@/components/Home/PreMoodContents.vue';
import AfterMoodContents from '@/components/Home/AfterMoodContents.vue';
import TodayMoodSelectList from '@/components/Modal/TodayMoodSelectList.vue';
import { mapMutations } from 'vuex';

const app = {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  components: {
    AddMood,
    Calendar,
    PreMoodContents,
    AfterMoodContents,
    TodayMoodSelectList,
  },
  props: {},
  data() {
    return {
      todayMood: {
        type: '',
        isSave: false,
      },
      modal: {
        type: '',
        isVisible: false,
      },
    };
  },
  computed: {
    isSelectModal() {
      return this.modal.type === 'moodList';
    },
    isDiaryForm() {
      return this.modal.type === 'diaryForm';
    },
  },
  methods: {
    ...mapMutations(['setTodayMood']),
    setTodayMood(value) {
      this.todayMood.type = value;
    },
    openDiaryForm() {
      this.modal.type = 'diaryForm';
    },
    openModal() {
      this.modal.type = 'moodList';
      this.modal.isVisible = true;
    },
    closeModal() {
      this.modal.isVisible = false;
    },
  },
};

export default app;

</script>

<style lang="scss">
@import "src/style/color";

.home-background {
  width: 100vh;
  height: 40vh;
  position: fixed;
  bottom: 0;
  z-index: -10;

  &.happy {
    background: linear-gradient($transparent, $happy);
  }
  &.excite {
    background: linear-gradient($transparent, $excite);
  }
  &.angry {
    background: linear-gradient($transparent, $angry);
  }
  &.worry {
    background:linear-gradient($transparent, $worry);
  }
  &.depressed {
    background: linear-gradient($transparent, $depressed);
  }
  &.peaceful {
    background: linear-gradient($transparent, $peaceful);
  }
}

.edit {
  position: fixed;
  bottom: 11vh;
  right: 3vh;
  width: 4em;
  height: 4em;

  border: none;
  border-radius: 50px;
  color: $white;
  background: $black;
}
</style>
