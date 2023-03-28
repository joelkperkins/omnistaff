import { GenresModel } from '../../models/genres/genres.model';

const category = 'GENRES';

export class ResetGenres {
  static readonly type = `[${category}] ResetActiveGenres`;
}

export class ChangeInactiveGenres {
  static readonly type = `[${category}] ChangeInactiveGenres`;
  constructor(public genres: GenresModel[]) {}
}

export class UpdateActiveGenres {
  static readonly type = `[${category}] UpdateActiveGenres`;
  constructor(public genre: GenresModel) {}
}

export class UpdateInactiveGenres {
  static readonly type = `[${category}] UpdateInactiveGenres`;
  constructor(public genre: GenresModel) {}
}
