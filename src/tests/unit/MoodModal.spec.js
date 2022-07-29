import { mount, flushPromises } from '@vue/test-utils';

import Home from '@/views/Home.vue';
import TodayMoodSelectList from '../../components/Modal/MoodSelectList';

const $store = {
  state: {
    todayMood: 'happy',
  },
  commit: jest.fn(),
};

describe('Modal.vue', () => {
  let wrapper;

  beforeEach(async () => {
    $store.commit.mockClear();

    wrapper = mount(TodayMoodSelectList, {
      global: {
        mocks: {
          $store,
        },
      },
    });
  });

  test('기분 리스트 item 6개인지 확인', () => {
    const moodListCount = wrapper.findAll('[data-test="today-mood-item"]').length;

    expect(moodListCount).toBe(6);
  });

  test('오늘의 기분 기본 값("happy")이 리스트에서 선택되어 있는지?', async () => {
    await wrapper.setData({
      todayMood: 'happy',
    });

    const happyMoodItem = wrapper.get('[data-test="today-mood-happy"]');
    const selectedRadio = await wrapper.findAll('[data-test="today-mood-radio"]:checked')[0];

    await expect(happyMoodItem.classes('happy')).toBeTruthy();
    await expect(selectedRadio.attributes('value')).toBe('happy');
  });

  test('기분 리스트 item("peaceful") 선택 시, todayMoodType에 setData 되는지 확인.', async () => {
    const peacefulMoodRadio = wrapper.get('[data-test="today-mood-peaceful"]');
    const footerButton = wrapper.get('[data-test="footer-button"]');

    await peacefulMoodRadio.trigger('click');
    await footerButton.trigger('click');

    await expect($store.commit).toHaveBeenCalledWith('setTodayMood', 'peaceful');
  });
});

describe('vuex store test', () => {
  let wrapper;

  beforeEach(async () => {
    $store.commit.mockClear();

    wrapper = mount(Home, {
      global: {
        mocks: {
          $store,
        },
      },
    });
  });

  test('store 불러오는지 확인', () => {
    expect($store.state.todayMood).toEqual('happy');
  });
});
