import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { PersonasModel } from '../../../models/personas/personas.model';
import { PersonasService } from '../../../models/personas/personas.service';
import {
  PersonasState,
  PersonasCategory,
} from '../../../state/personas/personas.state';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
})
export class PersonasComponent implements OnInit, OnDestroy {
  @Select(PersonasState.activePersonas)
  activePersonas$: Observable<PersonasModel[]>;

  @Select(PersonasState.inactivePersonas)
  inactivePersonas$: Observable<PersonasModel[]>;

  @Select(PersonasState.activeCategory)
  activeCategory$: Observable<PersonasCategory>;

  categories: string[] = [];
  category: PersonasCategory;
  personas: PersonasModel[] = [];
  activePersonas: PersonasModel[] = [];

  subscription: Subscription = new Subscription();

  constructor(private store: Store, private personasService: PersonasService) {}

  ngOnInit(): void {
    const sub$ = combineLatest([
      this.inactivePersonas$,
      this.activePersonas$,
      this.activeCategory$,
    ]).subscribe((items: any) => {
      const personas: PersonasModel[] = items[0];
      const activePersonas: PersonasModel[] = items[1];
      const category: PersonasCategory = items[2];
      this.category = category;
      this.categories = this.getCategories(personas);
      this.personas = personas.filter((persona) => persona.type === category);
      this.activePersonas = activePersonas.filter(
        (persona) => persona.type === category
      );
    });
    this.subscription.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategories(personas: PersonasModel[]): string[] {
    const categories: string[] = [];
    personas.forEach((persona) => {
      if (!categories.includes(persona.type)) {
        categories.push(persona.type);
      }
    });
    return categories;
  }

  drop(event: CdkDragDrop<PersonasModel[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  changePersonaCategory(category: any): void {
    this.personasService.changeActiveCategory(category.value);
  }

  setActive(persona: PersonasModel): void {
    this.personasService.updateActivePersonas(persona);
  }

  setInactive(persona: PersonasModel): void {
    this.personasService.updateInactivePersonas(persona);
  }
}
