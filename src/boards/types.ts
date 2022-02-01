import { Board } from './models/board.model';

export type BoardGetT = Pick<Board, 'title' | 'columns' | 'id'>;

export type BoardSetT = Pick<Board, 'title' | 'columns'>;

