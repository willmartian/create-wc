# create-wc

A super simple code generator for web components.

## Usage

Supply the HTML API for the web component in quotes: 

`npm init wc "<my-component foo='bar'>"` or `npx create-wc "<my-component hi='mom'>"`

Multiple arguments can be passed to generate multiple components:

`npm init wc "<comp-one>" "<comp-two>"`

## Templates

The template can be changed by specifying the `--lib` flag with one of the following options. The options will persist, so you only need to supply it once.

To be implemented:

- [ ] Vanilla JavaScript
- [ ] Vanilla TypeScript
- [ ] LitElement JavaScript
- [x] LitElement TypeScript: `--lib=lit.ts`
- [ ] Stencil JavaScript
- [ ] Stencil TypeScript

Ex: `npm init wc "<hello-world foo='bar'>" --lib=lit.ts`

```ts
import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('hello-world')
export class HelloWorld extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  foo = 'bar';

  render() {
    return html`<p>Hello, world!</p>`;
  }
}

```