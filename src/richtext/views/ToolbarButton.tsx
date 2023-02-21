/** @jsx createElement **/
import { createElement, FC, SyntheticEvent, ReactNode, useState } from 'react'
import { ButtonEntity } from '../types'

interface Props {
  active: boolean
  visible?: boolean
  entity: ButtonEntity
  nestedActions?: ReactNode
  clickHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
}

const ToolbarButton: FC<Props> = ({ active, visible, clickHandler, nestedActions, entity }) => {
  const [_showNestedActions, _setShowNestedActions] = useState(false)

  const classes = ['toolbar-button']
  active && classes.push('active')
  visible ? classes.push('visible') : classes.push('hidden')
  nestedActions && _showNestedActions && classes.push('has-nested show-nested')

  const child = entity.component ? entity.component() : entity.icon ? <i className={entity.icon} /> : <span>{entity.label}</span>

  if (nestedActions)
    return (
      <div
        className={classes.join(' ')}
        onMouseOver={() => _setShowNestedActions(true)}
        onMouseLeave={() => _setShowNestedActions(false)}
        title={entity.label}
      >
        {child}
        <div className="nested">{nestedActions}</div>
      </div>
    )

  return (
    <button className={classes.join(' ')} onClick={clickHandler} value={entity.style} title={entity.label}>
      {child}
    </button>
  )
}

export default ToolbarButton
