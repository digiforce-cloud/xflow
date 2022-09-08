import React from 'react'
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import type { NsGraph } from '@digiforce-cloud/xflow'
import { useXFlowApp, XFlowGroupCommands } from '@digiforce-cloud/xflow'

import './index.less'

export const GroupNode: NsGraph.INodeRender = props => {
  const { cell } = props
  const app = useXFlowApp()
  const isCollapse = cell.getProp('isCollapsed') || false
  const onExpand = e => {
    app.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
      nodeId: cell.id,
      isCollapsed: false,
    })
  }
  const onCollapse = e => {
    app.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
      nodeId: cell.id,
      isCollapsed: true,

      gap: 3,
    })
  }

  return (
    <div className="xflow-group-node">
      <div className="xflow-group-header">
        <div className="header-left">{props.data.label}</div>
        <div className="header-right">
          {isCollapse && <PlusSquareOutlined onClick={onExpand} />}
          {!isCollapse && <MinusSquareOutlined onClick={onCollapse} />}
        </div>
      </div>
    </div>
  )
}
