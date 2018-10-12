import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterLinkDirectiveStub } from './router-link-directive-stub';

export class ComponentFixtureUtils<T> {

  private debugEl: DebugElement;

  constructor(private componentFixture: ComponentFixture<T>) {
    this.debugEl = componentFixture.debugElement;
  }

  // click

  // TODO return type
  click(css: string): string | [any] {
    const el = this.getElement(css) as HTMLElement;
    el.click();
    return this.getRouteForLastClick();
  }

  clickButtonWithText(text: string, index = 0): string | [any] {
    this.clickElementWithText('button', text, index);
    return this.getRouteForLastClick();
  }

  clickLinkWithText(text: string, index = 0): string | [any] {
    this.clickElementWithText('a', text, index);
    return this.getRouteForLastClick();
  }

  clickElementWithText(css: string, text: string, index = 0): string | [any] {
    this.getAllElements(css)
      .filter( el => el.innerText === text)[index].click();
    return this.getRouteForLastClick();
  }

  // set value

  setElementValue(css: string, value: string): void {
    const el = this.getElement(css) as HTMLInputElement;
    el.value = value;
    el.dispatchEvent(new Event('input'));
    this.componentFixture.detectChanges();
  }

  // get element text

  getAllElementText(css: string): string[] {
    return this.getAllElements(css)
      .map((el: HTMLElement) => el.textContent);
  }

  getElementText(css: string, index = 0): string {
    return this.getAllElementText(css)[index];
  }

  // route

  getRouteForLastClick(): string | [any] {
    const directiveInstance = this.debugEl
      .queryAll(By.directive(RouterLinkDirectiveStub));

    for (let i = 0; i < directiveInstance.length; i++) {
      const instance = directiveInstance[i].injector.get(RouterLinkDirectiveStub);
      if (instance.navigatedTo) {
        return instance.navigatedTo;
      }
    }

    return;
  }

  // get elements

  getElement(css: string, index = 0): HTMLElement {
    return this.getAllElements(css)[index];
  }

  getAllElements(css: string): HTMLElement[] {
    return this.debugEl.queryAll(By.css(css))
      .map(debugElement => debugElement.nativeElement);
  }

  getDebugElement(css: string, index = 0): DebugElement {
    return this.getAllDebugElements(css)[index];
  }

  getAllDebugElements(css: string): DebugElement[] {
    return this.debugEl.queryAll(By.css(css));
  }
}
