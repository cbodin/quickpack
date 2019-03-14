export default class App {
  static init() {
    const countSpan = document.querySelector('.span-count');
    const countBtn = document.querySelector('.btn-count');

    let count = 0;
    countBtn.addEventListener('click', () => {
      countSpan.innerText = ++count;
    });
  }
}
