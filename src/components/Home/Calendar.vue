<template>
  <div class="calendar-wrapper">
    <v-calendar
        is-expanded
        title-position="left"
        :attributes="attrs"
        :locale="locale"
        @dayclick="dayClicked">
      <template v-slot:header-title="{ month, yearLabel }">
        <span class="title">
          <a class="month">{{ month }}</a><a class="year">{{ yearLabel }}</a>
        </span>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import MoodDayDates from '@/assets/datas/moodDayData';

// const { dates } = MoodDayDates.filter(({ mood }) => mood === 'happy')[0];

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Calendar',
  components: {},
  data() {
    return {
      locale: {
        id: 'en',
        masks: { weekdays: 'WW' },
      },
      attrs: [{
        key: 'today',
        highlight: {
          class: 'date-circle',
          contentClass: 'date-text',
        },
        dates: new Date(),
      }, {
        key: 'happy',
        dot: 'yellow',
        dates: MoodDayDates.filter(({ mood }) => mood === 'happy')[0].dates,
      }, {
        key: 'excite',
        dot: 'orange',
        dates: MoodDayDates.filter(({ mood }) => mood === 'excite')[0].dates,
      }, {
        key: 'angry',
        dot: 'red',
        dates: MoodDayDates.filter(({ mood }) => mood === 'angry')[0].dates,
      }, {
        key: 'worry',
        dot: 'purple',
        dates: MoodDayDates.filter(({ mood }) => mood === 'worry')[0].dates,
      }, {
        key: 'depressed',
        dot: 'blue',
        dates: MoodDayDates.filter(({ mood }) => mood === 'depressed')[0].dates,
      }, {
        key: 'peaceful',
        dot: 'green',
        dates: MoodDayDates.filter(({ mood }) => mood === 'peaceful')[0].dates,
      }],
    };
  },
  methods: {
    dayClicked(day) {
      console.log('day', day);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/color";

.calendar-wrapper {
  margin: 10px 20px;

  .vc-container {
    border: none;

    .vc-header{
      margin: 10px 0;
    }
  }
}

.vc-weekday {
  border-bottom: $black 1px solid;
  color: $black !important;
  padding: 8px 0 15px 0 !important;
}
.vc-day {
  height: 50px;
  .vc-day-content {
  }
}

.title {
  margin: 0 10px;

  .month {
    font-size: 2.5em;
    text-shadow: 1px 3px 3px $dark-gray;
    margin-right: 10px;
  }
  .year {
    color: $dark-gray;
  }
}

.date-circle {
  background: $black;
}
.date-text {
  color: $white;
}

.vc-dot {
  margin-top:3px;
  width: 10px !important;
  height: 10px !important;
}

</style>
