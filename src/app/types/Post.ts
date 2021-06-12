import { Data } from "@/app/types/data";

export interface Post extends Data {
  userId?: number,
  id?: number,
  title?: string,
  body?: string
}
