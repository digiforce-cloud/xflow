import React from 'react'
import { useXFlowApp } from '@digiforce-cloud/xflow-core'
import { ToolbarConfig } from './config'
import { XFlowToolbar } from './render-components'
import type { IToolbarProps } from './interface'

export const CanvasToolbar: React.FC<IToolbarProps> = props => {
  const app = useXFlowApp()
  const hasApp = !!app
  /** 获取ContextMenu的配置 */
  const contextMenuConfig = React.useMemo<ToolbarConfig>(
    () => (props.config ? props.config : new ToolbarConfig()),
    [props.config],
  )

  if (!hasApp) {
    return null
  }

  return <XFlowToolbar {...props} config={contextMenuConfig} />
}

// 缓存props
interface IValueProxy<T> {
  getValue: () => T
}

export const createToolbarConfig =
  <T extends unknown = any>(addOptions: (config: ToolbarConfig, proxy: IValueProxy<T>) => void) =>
  (value?: T) => {
    /** bridge config and value */
    const proxy = React.useMemo(() => ({ getValue: () => ({} as T) }), [])
    proxy.getValue = () => value
    /** 生成config */
    const toolbarConfig = React.useMemo(() => {
      const config = new ToolbarConfig()
      addOptions(config, proxy)
      return config
    }, [proxy])

    return toolbarConfig
  }

export { IToolbarProps }
