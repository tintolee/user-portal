const ua = navigator.userAgent;

export function isBrowserIE(): boolean {
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}

export function isBrowserOperaMini(): boolean {
  return ua.indexOf('Opera Mini') > -1;
}

export function isOldEdge(): boolean {
  return ua.indexOf('Edge') > -1;
}
