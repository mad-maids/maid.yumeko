/**
 * Database Exports
 * @name database
 * @description exporting all database in one point
 * @types {{eternal: *, temporary: *}}
 */

interface Winners {
  userid: number;
  username: string;
}

export const users: (string | number)[] = [];

export const winners: Winners[] = [];

export const played: number[] = [];
