import Vue from 'vue';

Vue.directive('el-transform', {
  bind(el, binding, vnode) {
    let currentDeg = 0;
    el.addEventListener('dblclick', () => {
      const increment = binding.value || 90;
      currentDeg += increment;
      el.style.transform = `rotate(${currentDeg}deg)`;
      el.style.transition = 'transform 0.3s';
    });
  }
});
