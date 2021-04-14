import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Location } from '../_Models/Location';

export interface LocationState extends EntityState<Location, number> { 
  // filter: string;
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'location',idKey:'location_ID' })
export class LocationStore extends EntityStore<LocationState> {
  constructor() {
    super();
  }
}