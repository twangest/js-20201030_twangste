class Tooltip {
  tooltipElements;
  initialize() {
    this.initEventListeners();
  }

  constructor() {
    this.deltaX = 10;
    this.deltaY = 10;
  }

  getTemplate(message = '') {
    return `<div class="tooltip">${message}</div>`;
  }
  render(message, position = {}) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTemplate(message);
    this.element = wrapper.firstElementChild;
    document.body.append(this.element);
  }
  showTooltip = (element) => {
    const targetElement = element.target;
    if (targetElement.dataset.tooltip) {
      this.render(targetElement.dataset.tooltip);
      targetElement.addEventListener('pointermove', this.moveTooltip);
    }

  }
  moveTooltip = (element) => {
    this.element.style.left = `${element.clientX + this.deltaX}px`;
    this.element.style.top = `${element.clientY + this.deltaY}px`;
  }
  closeTooltip = (element) => {
    const targetElement = element.target;
    targetElement.removeEventListener('pointermove', this.moveTooltip);
    this.remove();
  }
  initEventListeners() {
    document.addEventListener('pointerover', this.showTooltip);
    document.addEventListener('pointerout', this.closeTooltip);
  }
  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    document.removeEventListener('pointerover', this.showTooltip);
    document.removeEventListener('pointerout', this.closeTooltip);
    this.remove();
    this.element = null;
  }
}

const tooltip = new Tooltip();

export default tooltip;
