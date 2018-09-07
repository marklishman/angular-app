
export function enterText(host: HTMLElement, elementId: string, value: string) {
  const el: HTMLInputElement = host.querySelector('#' + elementId);
  el.value = value;
  el.dispatchEvent(new Event('input'));
}
