export default class ColumnChart {
  constructor(params) {
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        this[key] = value;
      }
    }
    this.chartHeight = 50;
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header"></div>
        <div data-element="body" class="column-chart__chart"></div>
      </div>
    </div>
    `;
    this.element = element.firstElementChild;
    this.renderTitle();
    this.renderHeader();
    this.renderData();
  }
  renderTitle() {
    const title = this.element.querySelector('.column-chart__title');
    if (this.label) {
      title.append('Total ' + this.label);
    }
    if (this.link) {
      const link = document.createElement('a');

      link.classList.add('column-chart__link');
      link.setAttribute('href', this.link);
      link.innerText = 'View all';

      title.append(link);
    }
  }
  renderHeader() {
    if (this.value) {
      const dataHeader = this.element.querySelector('.column-chart__header');
      dataHeader.innerHTML = this.value;
    }
  }
  renderData() {
    const chart = this.element.querySelector('.column-chart__chart');
    if (this.data) {
      const chartData = this.getColumnProps(this.data);
      chartData.forEach((item) => {
        const el = document.createElement('div');
        el.style.setProperty('--value', item.value);
        el.setAttribute('data-tooltip', `${item.percent}`);
        chart.append(el);
      });
    }
    this.toggleLoadingClass();
  }
  toggleLoadingClass() {
    const elementHasLoadingClass = this.element.classList.contains('column-chart_loading');
    const isLoading = !this.data;
    if (isLoading) {
      if (!elementHasLoadingClass) this.element.classList.add('column-chart_loading');
    } else {
      if (elementHasLoadingClass) this.element.classList.remove('column-chart_loading');
    }
  }
  update(data) {
    this.data = data;
    this.renderData();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
