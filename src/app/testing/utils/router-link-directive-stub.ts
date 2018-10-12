import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub implements AfterViewInit {

  @Input('routerLink') linkParams: any;
  innerText: string;
  navigatedTo: any = null;

  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.innerText = this.host.nativeElement.innerText;
  }

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }

}
