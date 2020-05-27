class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) : selector
  }

  addClass(...classes) {
    if (classes) {
      classes.forEach(c => this.$el.classList.add(c))
    }
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) this.$el.append(node)
    else this.$el.appendChild(node);
    return this;
  }

  attr(key, value) {
    if (!value) {
      return this.$el.getAttribute(key)
    }
    this.$el.setAttribute(key, value);
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  css(style) {
    Object.keys(style).forEach(key => this.$el.style[key] = style[key])
  }

  clear() {
    this.html(' ');
    return this;
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return $(this.$el.querySelectorAll(selector))
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: parsed[0],
        col: parsed[1]
      }
    }
    return this.data.id
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback);
    return this;
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback);
    return this;
  }

  removeClass(...classes) {
    if (classes) {
      classes.forEach(c => this.$el.classList.remove(c))
    }
    return this;
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim()
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
