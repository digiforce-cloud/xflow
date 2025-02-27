/**
 * title: 工具栏状态联动
 * desc: 通过ModelService实现ToolbarItem的可用状态
 */
import React from 'react'
import type { IAppLoad, NsNodeCmd } from '@digiforce-cloud/xflow'
import { XFlowNodeCommands } from '@digiforce-cloud/xflow'
import { XFlow, createGraphConfig, XFlowCanvas, CanvasToolbar } from '@digiforce-cloud/xflow'
import { useToolbarConfig } from './toolbar-config'
import './index.less'
import '@digiforce-cloud/xflow/dist/index.css'
/**  Demo Props  */
export interface IDemoProps {
  anything: string
}
/**  graphConfig：配置Graph  */
export const useGraphConfig = createGraphConfig<IDemoProps>(graphConfig => {
  graphConfig.setDefaultNodeRender(props => {
    return <div className="react-node"> {props.data.label} </div>
  })
})

const XFlowDemo: React.FC<IDemoProps> = props => {
  const graphConfig = useGraphConfig(props)
  const toolbarConfig = useToolbarConfig(props)

  const onLoad: IAppLoad = async app => {
    console.log(app)
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: `Node-1`,
        label: `Node-1`,
        x: 100,
        y: 50,
        width: 160,
        height: 32,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: `Node-2`,
        label: `Node-2`,
        x: 110,
        y: 60,
        width: 160,
        height: 32,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: `Node-3`,
        label: `Node-3`,
        x: 120,
        y: 70,
        width: 160,
        height: 32,
      },
    })
  }

  return (
    <XFlow onLoad={onLoad} className="xflow-workspace">
      <CanvasToolbar
        layout="horizontal"
        config={toolbarConfig}
        position={{ top: 0, left: 0, right: 0, height: 40 }}
      />
      <XFlowCanvas config={graphConfig} position={{ top: 40, bottom: 0, left: 0, right: 0 }} />
    </XFlow>
  )
}

export default XFlowDemo
