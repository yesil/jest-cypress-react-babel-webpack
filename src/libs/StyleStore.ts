import {computed, observable} from 'mobx'
import {
  BackgroundColor,
  BorderBottom,
  BorderColor,
  BorderLeft,
  BorderRight,
  BorderStyle,
  BorderTop,
  Color,
  Display,
  Flex,
  FlexDirection,
  JustifyContent,
  JustifyItems,
  JustifySelf,
  MarginBottom,
  MarginLeft,
  MarginRight,
  MarginTop,
  PaddingBottom,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
  Style,
} from './Style'

export class MediaQuery {
  @observable
  public minWidth?: string
  @observable
  public maxWidth?: string
  @computed
  get query() {
    const media = ['@media only screen']
    if (this.minWidth) {
      const minWidth =
        typeof this.minWidth === 'number' ? `${this.minWidth}px` : this.minWidth
      media.push(`(min-width: ${minWidth})`)
    }
    if (this.maxWidth) {
      const maxWidth =
        typeof this.maxWidth === 'number' ? `${this.maxWidth}px` : this.maxWidth
      media.push(`(max-width: ${maxWidth})`)
    }
    return media.join(' and ') + ' {'
  }
}

export class StyleStore {
  @computed
  get css(): string {
    const block = []
    block.push(this.mediaQuery.query)
    block.push(`
    ${this.selector} {\npublic   `)
    const properties = this.styles
      .filter(style => style.value && style.value !== '')
      .map(style => `\t${style.name}: ${style.value};`)
      .join('\n')
    block.push(properties)
    block.push('}\n}')
    return block.join('')
  }
  public selector: string

  public mediaQuery = new MediaQuery()

  public styles: Style[] = [
    new BorderStyle(),
    new BorderColor(),
    new BorderTop(),
    new BorderTop(),
    new BorderRight(),
    new BorderBottom(),
    new BorderLeft(),
    new BackgroundColor(),
    new Color(),
    new Display(),
    new Flex(),
    new FlexDirection(),
    new JustifyContent(),
    new JustifyItems(),
    new JustifySelf(),
    new MarginTop(),
    new MarginRight(),
    new MarginBottom(),
    new MarginLeft(),
    new PaddingTop(),
    new PaddingRight(),
    new PaddingBottom(),
    new PaddingLeft(),
  ]
  constructor(public name: string, selector?: string) {
    this.selector = selector || `[data-styleref='${this.name}']`
  }

  public styleReference(property: string) {
    return this.styles.find(style => style.name === property)
  }

  public update(json: any) {
    Object.keys(json.mediaQuery).forEach(key => {
      ;(this.mediaQuery as any)[key] = json.mediaQuery[key]
    })
    this.styles.forEach(style => {
      const s = json.styles.find(
        (jsonStyle: Style) => jsonStyle.name === style.name,
      )
      if (s) {
        style.value = s.value
      }
    })
  }
}

export class StyleManager {
  public styles: StyleStore[] = observable([])
  @observable
  public currentStyle: StyleStore | undefined

  public setSelector(selector: string, name: string) {
    let found = this.findStyle(selector)
    if (!found) {
      found = new StyleStore(name, selector)
      this.addStyle(found)
    }
    this.currentStyle = found
    return found
  }

  public setStyle(name: string) {
    const selector = `[data-styleref='${name}']`
    return this.setSelector(selector, name)
  }

  public addStyle(style: StyleStore) {
    this.styles.push(style)
  }

  public findStyle(selector: string) {
    return this.styles.find(style => style.selector === selector)
  }
}
