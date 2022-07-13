import { mount, flushPromises } from '@vue/test-utils';

import Home from '@/views/Home.vue';
import Calendar from '../../components/Home/Calendar';

describe('Home.vue', () => {
  test('"Home" 컴포넌트 렌더링 확인.', () => {
    const wrapper = mount(Home, {});

    expect(wrapper.find('[data-test="title"]').exists()).toBeTruthy();
  });

  test('"edit" 버튼 생성 여부.', () => {
    const wrapper = mount(Home);

    expect(wrapper.find('[data-test="mood-edit-button"]'));
  });

  test('"edit"버튼 클릭 시, 모달 생성 확인.', async () => {
    const wrapper = mount(Home);

    await wrapper.find('[data-test="mood-edit-button"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('[data-test="modal"]').exists()).toBeTruthy();
  });

  test('모달 "close"버튼 클릭시, 모달 닫히는지 확인.', async () => {
    const wrapper = mount(Home);

    await wrapper.setData({
      editModal: {
        isVisible: true,
      },
    });

    await wrapper.get('[data-test="modal-close"]').trigger('click');
    await flushPromises();

    await console.log(wrapper.html());
    await expect(wrapper.find('[data-test="modal"]').exists()).toBeFalsy();
  });
});
