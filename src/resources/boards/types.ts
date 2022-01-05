import { Board } from './board.model';

export type boardGetT = Pick<Board, 'title' | 'columns' | 'id'>;

export type boardSetT = Pick<Board, 'title' | 'columns'>;

