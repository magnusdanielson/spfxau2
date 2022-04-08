import { PartialCustomElementDefinition } from '@aurelia/runtime-html';
import {customElement} from 'aurelia';

// I would like to not need line 5-9
// import html from "./my-component.html";
// @customElement(<PartialCustomElementDefinition>{
//     template: html,
//     name: 'my-component'
//   })
export class MyComponent
{
    public message = 'Hello World!';
}
