import type { IPosition } from '@digiforce-cloud/xflow-core'
import React from 'react'
import { CanvasToolbar } from '../canvas-toolbar'
import { useConfig, CANVAS_SCALE_TOOLBAR_CONFIG } from './config'

interface IProps {
  position: IPosition
  className?: string
  layout?: 'vertical' | 'horizontal'
  style?: React.CSSProperties
}

const CanvasScaleToolbar: React.FC<IProps> = props => {
  const config = useConfig(props)
  return (
    <CanvasToolbar
      layout="vertical"
      {...props}
      config={config}
      position={props.position || { top: 12, right: 12 }}
    />
  )
}

export { CanvasScaleToolbar, IProps as ICanvasScaleToolbarProps, CANVAS_SCALE_TOOLBAR_CONFIG }
