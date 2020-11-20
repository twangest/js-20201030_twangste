class Tooltip {
  tooltipElements;
  initialize() {
    this.initEventListeners();
  }

  constructor() {
    this.deltaX = 10;
    this.deltaY = 10;
  }

  getTemplate(message = '', {clientX, clientY}) {
    return `<div class="tooltip"
                style="left: ${clientX + this.deltaX}px; top: ${clientY + this.deltaY}px;"
             >
                ${message}
             </div>`;
  }
  render(message, position = {}) {
    if (this.element) {
      this.remove();
    }
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTemplate(message, position);
    this.element = wrapper.firstElementChild;
    document.body.append(this.element);
  }
  showTooltip = (element) => {
    const targetElement = element.target;
    this.render(targetElement.dataset.tooltip);
  }
  moveTooltip = (el) => {
    this.render(el.target.dataset.tooltip, el);
  }
  closeTooltip = (element) => {
    this.remove();
  }
  initEventListeners() {
    this.tooltipElements = document.body.querySelectorAll('[data-tooltip]');
    this.tooltipElements.forEach(elem => {
      elem.addEventListener('pointerover', this.showTooltip);
      elem.addEventListener('pointermove', this.moveTooltip);
      elem.addEventListener('pointerout', this.closeTooltip);
    });
  }
  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove();
    this.element = null;
    if (this.tooltipElements) {
      this.tooltipElements.forEach(elem => {
        elem.removeEventListener('pointerover', this.showTooltip);
        elem.removeEventListener('pointermove', this.moveTooltip);
        elem.removeEventListener('pointerout', this.closeTooltip);
      });
    }
    this.tooltipElements = null;
  }
}

const tooltip = new Tooltip();

export default tooltip;
