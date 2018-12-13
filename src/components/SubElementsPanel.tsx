import {List, ListItem} from '@react/react-spectrum/List'
import {observer} from 'mobx-react'
import * as React from 'react'
import {SubnodeClickCallback, SubnodeHighlightCallback} from '../libs/types'
import Panel from './Panel'

const colorScale = [
  '#1f77b4',
  '#d62728',
  '#ffbb78',
  '#2ca02c',
  '#c5b0d5',
  '#ff9896',
  '#9467bd',
  '#aec7e8',
  '#ff7f0e',
  '#98df8a',
]

const doTraverse = (el: HTMLElement, tags: string[], selector: string) => {
  const nths: {[key: string]: number} = {}
  for (let i = 0; i < el.children.length; i++) {
    const value = el.children.item(i) as HTMLElement
    nths[value.tagName] = nths[value.tagName] || 0
    nths[value.tagName]++
    traverse(
      value,
      tags,
      (selector ? selector + ' > ' : '') +
        `${value.tagName}:nth-of-type(${nths[value.tagName]})`,
    )
  }
}

function traverse(
  el: HTMLElement,
  tags: string[] | undefined,
  selector = '',
): string[] {
  if (tags === undefined) {
    tags = []
    doTraverse(el, tags, selector)
  } else {
    if (!el.dataset || !el.dataset.styleref) {
      tags.push(selector)
      doTraverse(el, tags, selector)
    }
  }
  return tags
}

function SubElementsPanel({
  selector,
  subnodeHighlightCallback,
  subnodeClickCallback,
}: {
  selector: string
  subnodeHighlightCallback: SubnodeHighlightCallback
  subnodeClickCallback: SubnodeClickCallback
}) {
  const el: HTMLElement | null = document.body.querySelector(selector)
  let tags
  if (el) {
    tags = traverse(el, undefined).map((subSelector, index) => {
      const backgroundColor = colorScale[index % 9]
      const style: React.CSSProperties = {backgroundColor}
      return (
        <ListItem
          key={subSelector}
          onMouseOver={() =>
            subnodeHighlightCallback(
              selector + ' > ' + subSelector,
              backgroundColor,
            )
          }
          onMouseLeave={e => subnodeHighlightCallback('', '')}
          onSelect={e => subnodeClickCallback(selector + ' > ' + subSelector)}
        >
          {subSelector}
          <span style={style}>&nbsp;</span>
        </ListItem>
      )
    })
  }

  return (
    <Panel header="Sub Elements">
      <List>
        <ListItem>{selector}</ListItem>
        {tags}
      </List>
    </Panel>
  )
}

export default observer(SubElementsPanel)
