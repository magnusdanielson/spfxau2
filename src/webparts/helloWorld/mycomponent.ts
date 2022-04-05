import { PartialCustomElementDefinition } from '@aurelia/runtime-html';
import {customElement} from 'aurelia';

// I would like to not need line 5-9
import html from "./mycomponent.html";
@customElement(<PartialCustomElementDefinition>{
    template: html,
    name: 'mycomponent'
  })
export class mycomponent
{
    public message = 'Hello World!';
}
