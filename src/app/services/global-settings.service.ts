import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {
  private isMetric = true;

  constructor() { }

  getMeasureSetting(){
    return this.isMetric;
  }

  setMeasureSetting(setting: boolean){
    this.isMetric = setting;
  }
  
}
