import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    console.log(event.target.parentNode);
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode; // bad!!
      // const $parent = $resizer.$el.closest('.column') // better but bad
      const $parent = $resizer.closest('[data-type="resizeable"]');
      const coords = $parent.getCoords();
      console.log($parent.data.col);

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
        document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
      };
    }
  }
}
