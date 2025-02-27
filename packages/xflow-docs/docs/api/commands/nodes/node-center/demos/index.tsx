import React from 'react'
import type { IAppLoad, NsNodeCmd } from '@digiforce-cloud/xflow'
import { XFlow, createGraphConfig, XFlowCanvas, XFlowNodeCommands } from '@digiforce-cloud/xflow'
import { FormPanel, width, height } from './form'
import './index.less'

/**  graphConfig hook  */
export const useGraphConfig = createGraphConfig(graphConfig => {
  graphConfig.setX6Config({ grid: true })
  graphConfig.setDefaultNodeRender(props => {
    return <div className="react-node"> {props.data.label} </div>
  })
})

const NodeAddDemo: React.FC<{}> = () => {
  const graphConfig = useGraphConfig()
  const onLoad: IAppLoad = async app => {
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node1',
        x: 100,
        y: 30,
        label: 'Hello World 1',
        width,
        height,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node2',
        x: 50,
        y: 150,
        label: 'Hello World 2',
        width,
        height,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node3',
        x: 200,
        y: 150,
        label: 'Hello World 3',
        width,
        height,
      },
    })
    return app
  }

  return (
    <XFlow onLoad={onLoad} className="xflow-workspace">
      <FormPanel />
      <XFlowCanvas
        className="app-main-content"
        config={graphConfig}
        position={{ top: 0, left: 230, right: 0, bottom: 0 }}
      />
    </XFlow>
  )
}

export default NodeAddDemo
