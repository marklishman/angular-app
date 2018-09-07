import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export class ComponentFixtureUtils<T> {

  private debugEl: DebugElement;

  constructor(private componentFixture: ComponentFixture<T>) {
    this.debugEl = componentFixture.debugElement;
  }

  getAllElementsByCss(css: string): HTMLElement[] {
    return this.debugEl.queryAll(By.css(css))
      .map(debugElement => debugElement.nativeElement);
  }

  getElementByCss(css: string, index = 0): HTMLElement {
    return this.debugEl.queryAll(By.css(css))
      .map(debugElement => debugElement.nativeElement)[index];
  }

  getAllElementTextByCss(css: string): string[] {
    return this.getAllElementsByCss(css)
      .map((el: HTMLElement) => el.textContent);
  }

  getElementTextByCss(css: string, index = 0): string {
    return this.getElementByCss(css, index).textContent;
  }

  getTableRowText(tableId: string): string[][] {
    const table = this.getElementByCss('#' + tableId);
    const rows = table.getElementsByClassName('mat-row');
    const rowText: string[][] = [];
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByClassName('mat-cell');
      const cellText = this.getCellTextForRow(cells);
      rowText.push(cellText);
    }
    return rowText;
  }

  getCellTextForRow(cells: NodeListOf<Element>): string[] {
    const cellText: string[] = [];
    for (let i = 0; i < cells.length; i++) {
      cellText.push(cells.item(i).textContent);
    }
    return cellText;
  }

}
