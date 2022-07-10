# Canvas Liquid Effect

Demonstration of liquid (or gooey) effect on HTML Canvas using [Matter.js](https://github.com/liabru/matter-js) and SVG filters ([`feGaussianBlur`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur) and [`feColorMatrix`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix)).

### [DEMO](https://n3r4zzurr0.in/canvas-liquid-effect)

[
![Canvas Liquid Effect](https://raw.githubusercontent.com/n3r4zzurr0/canvas-liquid-effect/main/static/liquid.gif)](https://n3r4zzurr0.in/canvas-liquid-effect)

<hr>

## Liquid / Gooey Effect

This effect is obtained by first applying the blur filter and then by increasing the contrast of the alpha channel by applying the color matrix filter. I have created a [pen](https://codepen.io/n3r4zzurr0/pen/oNEMzOa) which demonstrates the same.

**Example**

```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="particles-filter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -4" result="goo" />
    </filter>
  </defs>
</svg>
  ```

## License

MIT © [Utkarsh Verma](https://github.com/n3r4zzurr0)
