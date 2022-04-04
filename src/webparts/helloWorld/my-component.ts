import { PartialCustomElementDefinition } from '@aurelia/runtime-html';
import {customElement} from 'aurelia';

@customElement(<PartialCustomElementDefinition>{
    template: '<template>Hello from the inline view<div class="message">${message}</div></template>',
    name: 'my-component'
  })
export class MyComponent
{
    public message = 'Hello World!';
}