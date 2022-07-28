import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import HomeRoutes from '@/router/HomeRoutes';
import MoodRoutes from '@/router/MoodListRoutes';

import App from '@/App.vue';
import Navigation from '@/components/App/Navigation.vue';

import MenuList from '@/assets/datas/navigationMenu.js';

const routes = [].concat(HomeRoutes, MoodRoutes);
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const $store = {
  state: {
    todayMood: 'happy',
  },
  commit: jest.fn(),
};

describe('Navigation.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navigation, {
      global: {
        plugins: [router],
      },
    });
  });

  test('Navigation 렌더링 확인.', () => {
    expect(wrapper.find('[data-test="nav-wrapper"]').exists()).toBe(true);
  });

  test('Navigation 메뉴 리스트 모두 불러오는지 확인.', async () => {
    await wrapper.setData({
      menus: MenuList,
    });

    const routerCount = wrapper.findAll('.link').length;

    expect(routerCount).toEqual(MenuList.length);
  });

  test('Font Awesome 아이콘 설정값으로 제대로 호출해오는지 확인.', async () => {
    await wrapper.setData({
      menus: MenuList,
    });

    const fontAwesomeIcons = wrapper.findAll('font-awesome-icon');

    MenuList.forEach(({ icon }, index) => {
      const isString = typeof icon === 'string';
      const iconName = isString ? icon : icon[1];

      expect(fontAwesomeIcons[index].attributes('icon')).toContain(iconName);
    });
  });
});

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    $store.commit.mockClear();
    wrapper = mount(App, {
      global: {
        plugins: [router],
        mocks: {
          $store,
        },
      },
    });
  });

  test("Navigation 'home' 버튼 클릭시, 라우팅되는지 확인.", async () => {
    await wrapper.get('[data-test="nav-router-home"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('[data-test="home-wrapper"]').exists()).toBeTruthy();
    expect(wrapper.get('[data-test="icon-home"]').classes('selected')).toBeTruthy();
  });

  test("Navigation 'moodList' 버튼 클릭 시, 라우팅 확인.", async () => {
    await wrapper.get('[data-test="nav-router-moodList"]').trigger('click');
    await flushPromises();

    expect(wrapper.get('[data-test="title"]').text()).toBe('MoodList');
    expect(wrapper.get('[data-test="icon-moodList"]').classes('selected')).toBeTruthy();
  });
});
