// todo: check usage
export type Writable<T extends Object> = { -readonly [Key in keyof T]: T[Key] }