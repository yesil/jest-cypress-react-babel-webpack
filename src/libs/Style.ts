import * as React from 'react'

import {observable} from 'mobx'

export abstract class Style {
  public abstract readonly name: string
  public abstract readonly description: string
  @observable
  public value?: string
  public groups?: string[]
}

export class Color extends Style {
  public name = 'color'
  public description = 'color'
}

export class BackgroundColor extends Style {
  public name = 'background-color'
  public description = 'color'
}

export class Display extends Style {
  public name = 'display'
  public description = 'Display'
}

export class Flex extends Style {
  public name = 'flex'
  public description = 'Flex'
  public groups = ['flex']
}

export class FlexDirection extends Style {
  public name = 'flex-direction'
  public description = 'Flex direction'
  public groups = ['flex']
}

export class FlexWrap extends Style {
  public name = 'flex-wrap'
  public description = 'Flex Wrap'
  public groups = ['flex']
}

export class JustifyContent extends Style {
  public name = 'justify-content'
  public description = 'Justify content'
  public groups = ['flex']
}

export class JustifyItems extends Style {
  public name = 'justify-items'
  public description = 'Justify items'
  public groups = ['grid', 'block']
}

export class JustifySelf extends Style {
  public name = 'justify-content'
  public description = 'Justify content'
  public groups = ['grid', 'block']
}

export class MarginTop extends Style {
  public name = 'margin-top'
  public description = 'Margin top'
}

export class MarginRight extends Style {
  public name = 'margin-right'
  public description = 'Margin right'
}

export class MarginBottom extends Style {
  public name = 'margin-bottom'
  public description = 'Margin bottom'
}

export class MarginLeft extends Style {
  public name = 'margin-left'
  public description = 'Margin left'
}

export class PaddingTop extends Style {
  public name = 'padding-top'
  public description = 'Padding top'
}

export class PaddingRight extends Style {
  public name = 'padding-right'
  public description = 'Padding right'
}

export class PaddingBottom extends Style {
  public name = 'padding-bottom'
  public description = 'Padding bottom'
}

export class PaddingLeft extends Style {
  public name = 'padding-left'
  public description = 'Padding left'
}

export class BorderStyle extends Style {
  public name = 'border-style'
  public description = 'Border style'
}

export class BorderColor extends Style {
  public name = 'border-color'
  public description = 'Border color'
}

export class BorderTop extends Style {
  public name = 'border-top'
  public description = 'Border top'
}

export class BorderRight extends Style {
  public name = 'border-right'
  public description = 'Border right'
}

export class BorderBottom extends Style {
  public name = 'border-bottom'
  public description = 'Border bottom'
}

export class BorderLeft extends Style {
  public name = 'border-left'
  public description = 'Border left'
}
