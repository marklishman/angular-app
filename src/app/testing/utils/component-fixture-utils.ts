import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export class ComponentFixtureUtils<T> {

  private debugEl: DebugElement;

  constructor(private componentFixture: ComponentFixture<T>) {
    this.debugEl = componentFixture.debugElement;
  }

  // get elements

  getAllElements(css: string): HTMLElement[] {
    return this.debugEl.queryAll(By.css(css))
      .map(debugElement => debugElement.nativeElement);
  }

  getElement(css: string, index = 0): HTMLElement {
    return this.getAllElements(css)[index];
  }

  // get element text

  getAllElementText(css: string): string[] {
    return this.getAllElements(css)
      .map((el: HTMLElement) => el.textContent);
  }

  getElementText(css: string, index = 0): string {
    return this.getAllElementText(css)[index];
  }

  // set value

  setElementValue(css: string, value: string): void {
    const el = this.getElement(css) as HTMLInputElement;
    el.value = value;
    el.dispatchEvent(new Event('input'));
    this.componentFixture.detectChanges();
  }

  // click

  click(css: string): void {
    const el = this.getElement(css) as HTMLElement;
    el.click();
  }
}
