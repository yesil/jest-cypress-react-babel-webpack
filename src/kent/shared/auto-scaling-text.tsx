import * as React from 'react'
const styles = require('./auto-scaling-text.module.css')

class AutoScalingText extends React.Component<{children?: React.ReactNode}> {
  public node = React.createRef<HTMLDivElement>()

  public getScale() {
    const node = this.node.current
    if (!node) {
      return 1
    }
    const parentNode = node.parentNode as HTMLElement

    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth

    if (actualScale < 1) {
      return actualScale * 0.9
    }
    return 1
  }

  public render() {
    const scale = this.getScale()

    return (
      <div
        className={styles.autoScalingText}
        style={{transform: `scale(${scale},${scale})`}}
        ref={this.node}
        data-testid="total"
      >
        {this.props.children}
      </div>
    )
  }
}

export default AutoScalingText
