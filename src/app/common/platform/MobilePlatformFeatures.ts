import { PlatformFeatures } from './PlatformFeatures';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobilePlatformFeatures implements PlatformFeatures {
  isMobile(): boolean {
    return true;
  }

  isWeb(): boolean {
    return false;
  }

}
