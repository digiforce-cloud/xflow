import React from 'react'
import classnames from 'classnames'
import { Toolbar } from '@digiforce-cloud/x6-react-components'
import { useXFlowApp } from '@digiforce-cloud/xflow-core'
import { IconStore } from '@digiforce-cloud/xflow-core'
import type { IToolbarItemOptions, IToolbarLayout } from '@digiforce-cloud/xflow-core'

export interface IProps {
  item: IToolbarItemOptions
  layout: IToolbarLayout
}

export const ToolbarItem: React.FC<IProps> = props => {
  const app = useXFlowApp()
  const { item, layout } = props
  const clz = classnames({
    ['xflow-toolbar-item']: true,
  })
  const text = layout === 'vertical' ? '' : item.text

  let icon: React.ReactNode = undefined
  if (item.icon) {
    icon = item.icon
  } else if (item.iconName) {
    const Icon = IconStore.get(item.iconName)
    icon = <Icon />
  }

  const ToolbarItemWrap = item.render
  const { isEnabled = true } = item
  const { commandService, modelService } = app
  const onItemClick = () => {
    if (item.onClick) {
      item.onClick({ toolbarItem: item, commandService, modelService })
    }
  }
  if (ToolbarItemWrap) {
    return (
      <ToolbarItemWrap {...item} onClick={onItemClick}>
        <Toolbar.Item
          {...item}
          icon={icon}
          text={text}
          className={clz}
          disabled={!isEnabled}
          tooltip={item.tooltip || item.text}
          tooltipProps={{
            placement: layout === 'vertical' ? 'left' : 'bottom',
            ...item.tooltipProps,
          }}
          onClick={() => {}}
        />
      </ToolbarItemWrap>
    )
  }

  return (
    <Toolbar.Item
      {...item}
      icon={icon}
      text={text}
      className={clz}
      hidden={!item}
      disabled={!isEnabled}
      tooltip={item.tooltip || item.text}
      onClick={onItemClick}
      tooltipProps={{
        ...item.tooltipProps,
        placement: layout === 'vertical' ? 'left' : 'bottom',
      }}
    />
  )
}
