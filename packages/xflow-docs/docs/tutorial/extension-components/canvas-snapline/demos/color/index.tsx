/**
 * title: 对齐线颜色
 * desc: 使用color属性配置不同的对齐线颜色
 */
import React from 'react'
import type { IAppLoad, NsGraphCmd } from '@digiforce-cloud/xflow'
import {
  XFlow,
  XFlowCanvas,
  CanvasSnapline,
  XFlowGraphCommands,
  createGraphConfig,
} from '@digiforce-cloud/xflow'
import { getGraphData } from './mock'
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

  const onLoad: IAppLoad = async app => {
    // 计算布局
    const res = await app.executeCommand<
      NsGraphCmd.GraphLayout.IArgs,
      NsGraphCmd.GraphLayout.IResult
    >(XFlowGraphCommands.GRAPH_LAYOUT.id, {
      layoutType: 'dagre',
      layoutOptions: {
        type: 'dagre',
        /** 布局方向 */
        rankdir: 'TB',
        /** 节点间距 */
        nodesep: 60,
        /** 层间距 */
        ranksep: 30,
      },
      graphData: getGraphData(),
    })
    const { graphData } = res.contextProvider().getResult()
    // render
    await app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
      graphData: graphData,
    })
    // 居中
    await app.executeCommand<NsGraphCmd.GraphZoom.IArgs>(XFlowGraphCommands.GRAPH_ZOOM.id, {
      factor: 'real',
    })
  }

  return (
    <XFlow onLoad={onLoad} className="xflow-workspace">
      <XFlowCanvas config={graphConfig} position={{ top: 0, bottom: 0, left: 0, right: 0 }}>
        <CanvasSnapline color="#873bf4" />
      </XFlowCanvas>
    </XFlow>
  )
}

export default XFlowDemo
