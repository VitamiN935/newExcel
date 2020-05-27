export class TableSelector {
  static ACTIVE_CLASS = 'selected'

  constructor() {
    this.group = [];
    this.$current = null;
  }

  select($cell) {
    this.clear();
    this.group.push($cell);
    $cell.focus().addClass(TableSelector.ACTIVE_CLASS);
    this.$current = $cell;
  }

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelector.ACTIVE_CLASS))
    this.group = [];
  }

  selectGroup($group) {
    this.clear();
    $group.forEach($cell => $cell.addClass(TableSelector.ACTIVE_CLASS))
    this.group = [...$group];
  }
}
