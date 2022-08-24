// @ts-check

import { kebabToPascalCase } from "../utils.js";

/**
 * 
 * @param {string} tagName component name in kebab-case
 * @param {Array<{ 
 *  name: string, 
 *  value: (string | boolean | number), 
 *  isEvent: boolean
 * }>} attributes 
 * @returns {string}
 */
export const template = (tagName = "hello-world", attributes = []) => `import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('${tagName}')
export class ${kebabToPascalCase(tagName)} extends LitElement {
  static styles = css\`p { color: blue }\`;

  ${attributes.map(attr => 
    `@property()\n  ${attr.name} = '${attr.value}';`
  ).join('\n\n  ')}

  render() {
    return html\`<p>Hello, world!</p>\`;
  }
}
`;
