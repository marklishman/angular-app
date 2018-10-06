import { InjectionToken } from '@angular/core';
import { PlatformFeatures } from './common/platform/PlatformFeatures';

export const PLATFORM_FEATURES = new InjectionToken<PlatformFeatures>('platform.features');

// TODO common values using spread

export class AppModuleShared { }
