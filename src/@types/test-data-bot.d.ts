interface Internet {
  password(): string
  userName(): string
}

export function fake(cb: (cb: {internet: Internet}) => string)

declare function fields(fields: {
  [index: string]: string,
}): {
  [index: string]: string,
}

interface builder {
  fields: fields
}
export function build(type: string): builder
