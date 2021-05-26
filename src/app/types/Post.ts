import { Data } from "@angular/router";
export interface Post extends Data {
  userId?: number,
  id?: number,
  title?: string,
  body?: string
}
