export default class SortableTable {
  subElements = {};

  constructor(header = [], {data} = []) {
    this.header = header;
    this.data = data;
    this.render();
  }

  headerItemTemplate({id, sortable, title}) {
    return `
      <div class="sortable-table__cell"
           data-id="${id}"
           data-sortable="${sortable}"
      >
        <span>${title}</span>
        ${this.arrowTemplate()}
      </div>
    `;
  }
  arrowTemplate() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  get headerTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header.map(item => this.headerItemTemplate(item)).join('')}
      </div>
    `;
  }

  getBodyTemplate() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getBodyRowsTemplate(this.data)}
      </div>`;
  }
  getBodyRowsTemplate(data) {
    return data.map(item => {
      return `
         <a href="/products/${item.id}" class="sortable-table__row">
            ${this.getBodyRow(item)}
         </a>
      `;
    }).join('');
  }
  getBodyRow(item) {
    return this.header.map(cell => {
      return cell.template
        ? cell.template(item[cell.id])
        : `<div class="sortable-table__cell">${item[cell.id]}</div>`;
    }).join('');
  }
  get template() {
    return `
      <div class="sortable-table">
         ${this.headerTemplate}
         ${this.getBodyTemplate()}
      </div>
    `;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  render() {
    const el = document.createElement('div');
    el.innerHTML = this.template;
    this.element = el.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);


    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getBodyRowsTemplate(sortedData);
  }
  sortData(field, order) {
    const arr = [...this.data];
    const column = this.header.find(item=>item.id === field);
    const sortOrder = {
      'asc': 1,
      'desc': -1
    };
    const direction = sortOrder[order];
    return arr.sort((a, b) => {
      switch (column.sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string' :
        return direction * a[field].localeCompare(b[field], 'ru');
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

