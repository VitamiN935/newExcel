import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resize = $(event.target);
    const $parent = $resize.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resize.data.resize;
    const field = type === 'row' ? 'right' : 'bottom'

    $resize.css({[field]: -2500 + 'px'})

    let value;
    document.onmousemove = e => {
      if (type === 'col') {
        const step = e.pageX - coords.right;
        value = coords.width + step;
        $resize.css({right: -step + 'px'})
      } else {
        const step = e.pageY - coords.bottom;
        value = coords.height + step;
        $resize.css({bottom: -step + 'px'})
      }

      document.onmouseup = () => {
        if (type === 'col') {
          $parent.css({width: value + 'px'})
          $root.findAll(`[data-col="${$parent.data.col}"]`)
              .forEach($cell => $cell.css({width: value + 'px'}))
        } else {
          $parent.css({height: value + 'px'})
        }
        document.onmousemove = null;
        document.onmouseup = null;
        resolve({
          id: $parent.data[type],
          type,
          value
        })

        $resize.css({
          right: 0,
          bottom: 0
        })
      }
    }
  })
}
