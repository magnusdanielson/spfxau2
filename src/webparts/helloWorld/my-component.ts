import { PartialCustomElementDefinition } from '@aurelia/runtime-html';
import {customElement} from 'aurelia';

import html from "./my-component.html";
@customElement(<PartialCustomElementDefinition>{
    template: html,
    name: 'my-component'
  })
export class MyComponent
{
    public message = 'Hello World!';
}
