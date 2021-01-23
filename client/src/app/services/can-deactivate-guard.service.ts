import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from '../classes/component-can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<ComponentCanDeactivate>{

  canDeactivate(component: ComponentCanDeactivate): boolean {
    if(!component.canDeactivate()){
      if (confirm('Vous avez des changements non enregistrés, si vous  quittez ils seront perdus!')) {
          return true;
      } else {
          return false;
      }
    }
    return true;
  }
}
