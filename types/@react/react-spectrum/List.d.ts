import * as React from 'react'
import Icon from './Icon'

interface ListProps {
  className?: string
  selectable?: boolean
}
export class List extends React.Component<ListProps, any> {}

interface ListItemProps {
  selected?: boolean
  onMouseOver?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
  onSelect?: (e: any) => void
  icon?: React.ReactNode
}
export class ListItem extends React.Component<ListItemProps, any> {}
