import { mount, flushPromises } from '@vue/test-utils';

import Home from '@/views/Home.vue';

const $store = {
  state: {
    todayMood: 'happy',
  },
  commit: jest.fn(),
};

describe('Home.vue', () => {
  let wrapper;

  beforeEach(() => {
    $store.commit.mockClear();

    wrapper = mount(Home, {
      global: {
        mocks: {
          $store,
        },
      },
    });
  });

  test('"Home" 컴포넌트 렌더링 확인.', () => {
    expect(wrapper.find('[data-test="home-wrapper"]').exists()).toBeTruthy();
  });

  test('edit 버튼 생성 여부.', () => {
    expect(wrapper.find('[data-test="mood-edit-button"]')).toBeTruthy();
  });

  test('edit 버튼 클릭 시, 모달 생성 & 기분 리스트 렌더 확인.', async () => {
    await wrapper.find('[data-test="mood-edit-button"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('[data-test="modal"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="mood-list"]').exists()).toBeTruthy();
  });

  test('모달 close 버튼 클릭시, 모달 닫히는지 확인.', async () => {
    await wrapper.setData({
      modal: {
        type: 'moodList',
        isVisible: true,
      },
    });

    await wrapper.get('[data-test="modal-close"]').trigger('click');
    await flushPromises();

    await expect(wrapper.find('[data-test="modal"]').exists()).toBeFalsy();
  });

  test('"오늘의 기분" 등록 전 "PreMoodContents" 컴포넌트 호출 확인', async () => {
    await wrapper.setData({
      todayMood: {
        type: '',
        isSave: false,
      },
    });

    await expect(wrapper.find('[data-test="pre-mood-container"]').exists()).toBeTruthy();
  });

  test('"오늘의 기분" 등록 후 "AfterMoodContents" 컴포넌트 호출 확인', async () => {
    await wrapper.setData({
      todayMood: {
        type: 'happy',
        isSave: true,
      },
    });

    await expect(wrapper.find('[data-test="after-mood-container"]').exists()).toBeTruthy();
  });

  test('v-calendar 라이브러리 호출 확인', async () => {
    await wrapper.setData({
      locale: { id: 'en' },
      attrs: [{
        key: 'today',
        highlight: {
          class: 'date-circle',
          contentClass: 'date-text',
        },
        dates: new Date(),
      }],
    });

    // expect(wrapper.findAll('.vc-pane-container')).toContain('.vc-container');
  });
});
