import {Component} from '../core/Component';

export class ToolbarComponent extends Component {
  toHtml() {
    return `
      <div class="excel__toolbar">
        <div class="button">
            <i class="material-icons">format_align_left</i>
        </div>

        <div class="button">
            <i class="material-icons">format_align_center</i>
        </div>

        <div class="button">
            <i class="material-icons">format_align_right</i>
        </div>

        <div class="button">
            <i class="material-icons">format_bold</i>
        </div>

        <div class="button">
            <i class="material-icons">format_italic</i>
        </div>

        <div class="button">
            <i class="material-icons">format_underlined</i>
        </div>
      </div>
    `;
  }
}
