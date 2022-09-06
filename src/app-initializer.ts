import { Injectable, Injector } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { filter as _filter, merge as _merge } from 'lodash-es';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {
  constructor(
    private _injector: Injector,
    private _platformLocation: PlatformLocation,
    private _httpClient: HttpClient
  ) { }

  init(): () => Promise<boolean> {
   return () => {
      //abp.ui.setBusy();
      return new Promise<boolean>((resolve, reject) => {
        AppConsts.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + AppConsts.appBaseHref;
         this.getApplicationConfig(appBaseUrl, () => {
          //abp.ui.clearBusy();
          resolve(true)

        });
     });
    };
  }
  
  private getBaseHref(): string {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }

    return '/';
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return (
        document.location.protocol + '//' + document.location.hostname + port
      );
    }

    return document.location.origin;
  }

  

  // private getUserConfiguration(callback: () => void): void {
  //   const cookieLangValue = abp.utils.getCookieValue(
  //     'Abp.Localization.CultureName'
  //   );
  //   const token = abp.auth.getToken();

  //   const requestHeaders = {
  //     'Abp.TenantId': `${1}`,
  //     '.AspNetCore.Culture': `c=${cookieLangValue}|uic=${cookieLangValue}`,
  //   };

  //   if (token) {
  //     requestHeaders['Authorization'] = `Bearer ${token}`;
  //   }

  //   // this._httpClient
  //   //   .get<any>(
  //   //     `${AppConsts.remoteServiceBaseUrl}/GetAll`,
  //   //     {
  //   //       headers: requestHeaders,
  //   //     }
  //   //   )
  //   //   .subscribe((response) => {
  //   //     const result = response.result;

  //   //     _merge(abp, result);

  //   //     abp.clock.provider = this.getCurrentClockProvider(
  //   //       result.clock.provider
  //   //     );

  //   //     moment.locale(abp.localization.currentLanguage.name);

  //   //     if (abp.clock.provider.supportsMultipleTimezone) {
  //   //       moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
  //   //     }

  //   //   });
  //     callback();
  // }

  private getApplicationConfig(appRootUrl: string, callback: () => void) {
    this._httpClient
      .get<any>(`${appRootUrl}assets/${environment.appConfig}`, {
        headers: {
          'Abp.TenantId': `${1}`,
        },
      })
      .subscribe((response) => {
        AppConsts.appBaseUrl = response.appBaseUrl;
        AppConsts.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
        AppConsts.localeMappings = response.localeMappings;

        callback();
      });
  }
}
