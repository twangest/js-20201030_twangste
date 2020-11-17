const notifications = [];

export default class NotificationMessage {
  timer = null;
  constructor(message = '', {duration = 1000, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }
  get headerTemplate() {
    return `<div class="notification-header">${this.type}</div>`;
  }
  get body() {
    return `
      <div class="notification-body">
            ${this.message}
      </div>
    `;
  }
  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          ${this.headerTemplate}
          ${this.body}
        </div>
      </div>
    `;
  }
  render(el = null) {
    const element = el || document.createElement('div');
    element.innerHTML = this.template;
    this.element = (el) ? el : element.firstElementChild;
  }
  show(outerElement = null) {
    this.destroy();
    this.render(outerElement);
    notifications.push(this);
    document.body.append(notifications[0].element);
    this.timer = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }
  remove() {
    this.element.remove();
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  destroy() {
    this.remove();
    if (notifications.length) {
      const lastNotificator = notifications.shift();
      lastNotificator.remove();
    }
  }
}
