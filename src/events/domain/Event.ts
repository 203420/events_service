export class Event {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly date: string,
    readonly categories: string[],
    readonly images: string[] | null,
    readonly userId: number,
    readonly providersId: number[] | null
  ) {}
}
