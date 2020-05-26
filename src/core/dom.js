class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) : selector
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) this.$el.append(node)
    else this.$el.appendChild(node);
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

  get data() {
    return this.$el.dataset;
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback);
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback);
  }

  clear() {
    this.html(' ');
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
