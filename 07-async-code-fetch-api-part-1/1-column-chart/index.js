export default class ColumnChart {
  subElements = {};
  chartHeight = 50;
  baseUrl = 'https://course-js.javascript.ru/';
  constructor({
    url = 'api/dashboard',
    range = {from: Date.now(), to: Date.now()},
    data = [],
    label = '',
    link = '',
    value = 0
  } = {}) {

    this.data = data;
    this.range = range;
    this.label = label;
    this.link = link;
    this.value = value;
    this.url = this.baseUrl + url;
    this.render();
    this.update();
  }

  getColumnBody(data) {
    const values = [];
    data.forEach(item => {
      values.push(item.value);
    });
    const maxValue = Math.max(...values);
    const scale = this.chartHeight / maxValue;
    return data
      .map(item => {
        const percent = (item.value / maxValue * 100).toFixed(0);

        return `<div style="--value: ${Math.floor(item.value * scale)}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header">
             ${this.value}
           </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }

    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  async update(...[startDate, endDate]) {

    if (startDate) { this.range.from = startDate; }
    if (endDate) { this.range.to = endDate; }

    const url = this.url + `/?from=${this.range.from}&to=${this.range.to}`;

    if (!this.element.classList.contains('column-chart_loading')) {
      this.element.classList.add('column-chart_loading');
    }
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      this.data = [...Object.entries(responseJson)].map(this.dataMap);
      this.subElements.body.innerHTML = this.getColumnBody(this.data);
      if (this.data.length && this.element.classList.contains('column-chart_loading')) {
        this.element.classList.remove('column-chart_loading');
      }
    }
    catch (e) {
      //NOTE: Обработка ошибок загрузки с данных с сервера
      //console.log(e)
    }
  }
  dataMap = ([date, value]) => ({date, value})

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
