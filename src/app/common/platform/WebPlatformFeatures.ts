import { PlatformFeatures } from './PlatformFeatures';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebPlatformFeatures implements PlatformFeatures {
  isMobile(): boolean {
    return false;
  }

  isWeb(): boolean {
    return true;
  }

}
