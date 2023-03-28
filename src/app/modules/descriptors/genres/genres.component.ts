import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { GenresModel } from '../../../models/genres/genres.model';
import { GenresService } from '../../../models/genres/genres.service';
import { GenresState } from '../../../state/genres/genres.state';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit, OnDestroy {
  @Select(GenresState.activeGenres)
  activeGenres$: Observable<GenresModel[]>;

  @Select(GenresState.inactiveGenres)
  inactiveGenres$: Observable<GenresModel[]>;

  genres: GenresModel[] = [];
  activeGenres: GenresModel[] = [];

  subscription: Subscription = new Subscription();

  constructor(private store: Store, private genresService: GenresService) {}

  ngOnInit(): void {
    const sub$ = combineLatest([
      this.inactiveGenres$,
      this.activeGenres$,
    ]).subscribe((items: any) => {
      const genres: GenresModel[] = items[0];
      const activeGenres: GenresModel[] = items[1];
      this.genres = genres.filter((genre) => genre);
      this.activeGenres = activeGenres.filter((genre) => genre);
    });
    this.subscription.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<GenresModel[]>): void {
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

  setActive(genre: GenresModel): void {
    this.genresService.updateActiveGenres(genre);
  }

  setInactive(genre: GenresModel): void {
    this.genresService.updateInactiveGenres(genre);
  }
}
