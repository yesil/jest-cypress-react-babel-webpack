declare module 'test-data-bot' {
  interface Internet {
    password(): string
    userName(): string
  }

  export function fake(cb: (cb: {internet: Internet}) => string): string

  interface Fields {
    [index: string]: string
  }

  interface builder {
    fields: (fields: Fields) => any
  }

  export function build(type: string): builder
}
