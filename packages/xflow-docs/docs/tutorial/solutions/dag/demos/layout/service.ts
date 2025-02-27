/* eslint-disable @typescript-eslint/no-unused-vars */
import { DND_RENDER_ID, NODE_WIDTH, NODE_HEIGHT } from './constant'
import { uuidv4, NsGraph, NsGraphStatusCommand } from '@digiforce-cloud/xflow'
import type { NsRenameNodeCmd } from './cmd-extensions/cmd-rename-node-modal'
import type { NsNodeCmd, NsEdgeCmd, NsGraphCmd } from '@digiforce-cloud/xflow'
import type { NsDeployDagCmd } from './cmd-extensions/cmd-deploy'
/** mock 后端接口调用 */
export namespace MockApi {
  export const NODE_COMMON_PROPS = {
    renderKey: DND_RENDER_ID,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  } as const

  /** 查图的meta元信息 */
  export const queryGraphMeta: NsGraphCmd.GraphMeta.IArgs['graphMetaService'] = async args => {
    console.log('queryMeta', args)
    return { ...args, flowId: args.meta.flowId }
  }
  export const createPorts = (nodeId: string, count = 1, layout = 'LR') => {
    const ports = [] as NsGraph.INodeAnchor[]
    Array(count)
      .fill(1)
      .forEach((item, idx) => {
        const portIdx = idx + 1
        ports.push(
          ...[
            {
              id: `${nodeId}-input-${portIdx}`,
              type: NsGraph.AnchorType.INPUT,
              group: layout === 'TB' ? NsGraph.AnchorGroup.TOP : NsGraph.AnchorGroup.LEFT,
              tooltip: `输入桩-${portIdx}`,
            },
            {
              id: `${nodeId}-output-${portIdx}`,
              type: NsGraph.AnchorType.OUTPUT,
              group: layout === 'TB' ? NsGraph.AnchorGroup.BOTTOM : NsGraph.AnchorGroup.RIGHT,
              tooltip: `输出桩-${portIdx}`,
            },
          ],
        )
      })

    return ports
  }
  /** 加载图数据的api */
  export const loadGraphData = async (meta: NsGraph.IGraphMeta) => {
    const nodes: NsGraph.INodeConfig[] = [
      {
        ...NODE_COMMON_PROPS,
        id: 'node1',
        label: '算法节点-1',
        ports: createPorts('node1'),
      },
      {
        ...NODE_COMMON_PROPS,
        id: 'node2',
        label: '算法节点-2',
        ports: createPorts('node2'),
      },
      {
        ...NODE_COMMON_PROPS,
        id: 'node3',
        label: '算法节点-3',
        ports: createPorts('node3'),
      },
      {
        ...NODE_COMMON_PROPS,
        id: 'node4',
        label: '算法节点-4',
        ports: createPorts('node4'),
      },
    ]
    const edges: NsGraph.IEdgeConfig[] = [
      {
        id: uuidv4(),
        source: 'node1',
        target: 'node2',
        sourcePortId: 'node1-output-1',
        targetPortId: 'node2-input-1',
      },
      {
        id: uuidv4(),
        source: 'node1',
        target: 'node3',
        sourcePortId: 'node1-output-1',
        targetPortId: 'node3-input-1',
      },
      {
        id: uuidv4(),
        source: 'node1',
        target: 'node4',
        sourcePortId: 'node1-output-1',
        targetPortId: 'node4-input-1',
      },
    ]
    return { nodes, edges }
  }
  /** 保存图数据的api */
  export const saveGraphData: NsGraphCmd.SaveGraphData.IArgs['saveGraphDataService'] = async (
    meta: NsGraph.IGraphMeta,
    graphData: NsGraph.IGraphData,
  ) => {
    console.log('saveGraphData api', meta, graphData)
    return {
      success: true,
      data: graphData,
    }
  }
  /** 部署图数据的api */
  export const deployDagService: NsDeployDagCmd.IDeployDagService = async (
    meta: NsGraph.IGraphMeta,
    graphData: NsGraph.IGraphData,
  ) => {
    console.log('deployService api', meta, graphData)
    return {
      success: true,
      data: graphData,
    }
  }

  /** 添加节点api */
  export const addNode: NsNodeCmd.AddNode.IArgs['createNodeService'] = async (
    args: NsNodeCmd.AddNode.IArgs,
  ) => {
    console.info('addNode service running, add node:', args)

    const { id, ports = createPorts(id, 2), groupChildren } = args.nodeConfig
    const nodeId = id || uuidv4()
    /** 这里添加连线桩 */
    const node: NsNodeCmd.AddNode.IArgs['nodeConfig'] = {
      ...NODE_COMMON_PROPS,
      ...args.nodeConfig,
      id: nodeId,
      ports: ports,
    }
    /** group没有链接桩 */
    if (groupChildren && groupChildren.length) {
      node.ports = []
    }
    return node
  }

  /** 更新节点 name，可能依赖接口判断是否重名，返回空字符串时，不更新 */
  export const renameNode: NsRenameNodeCmd.IUpdateNodeNameService = async (
    name,
    node,
    graphMeta,
  ) => {
    console.log('rename node', node, name, graphMeta)
    return { err: null, nodeName: name }
  }

  /** 删除节点的api */
  export const delNode: NsNodeCmd.DelNode.IArgs['deleteNodeService'] = async args => {
    console.info('delNode service running, del node:', args.nodeConfig.id)
    return true
  }

  /** 添加边的api */
  export const addEdge: NsEdgeCmd.AddEdge.IArgs['createEdgeService'] = async args => {
    console.info('addEdge service running, add edge:', args)
    const { edgeConfig } = args
    return {
      ...edgeConfig,
      id: uuidv4(),
    }
  }

  /** 删除边的api */
  export const delEdge: NsEdgeCmd.DelEdge.IArgs['deleteEdgeService'] = async args => {
    console.info('delEdge service running, del edge:', args)
    return true
  }

  let runningNodeId = 0
  const statusMap = {} as NsGraphStatusCommand.IStatusInfo['statusMap']
  let graphStatus: NsGraphStatusCommand.StatusEnum = NsGraphStatusCommand.StatusEnum.DEFAULT
  export const graphStatusService: NsGraphStatusCommand.IArgs['graphStatusService'] = async () => {
    if (runningNodeId < 4) {
      statusMap[`node${runningNodeId}`] = { status: NsGraphStatusCommand.StatusEnum.SUCCESS }
      statusMap[`node${runningNodeId + 1}`] = { status: NsGraphStatusCommand.StatusEnum.PROCESSING }
      runningNodeId += 1
      graphStatus = NsGraphStatusCommand.StatusEnum.PROCESSING
    } else {
      runningNodeId = 0
      statusMap.node4 = { status: NsGraphStatusCommand.StatusEnum.SUCCESS }
      graphStatus = NsGraphStatusCommand.StatusEnum.SUCCESS
    }
    return {
      graphStatus: graphStatus,
      statusMap: statusMap,
    }
  }
  export const stopGraphStatusService: NsGraphStatusCommand.IArgs['graphStatusService'] =
    async () => {
      Object.entries(statusMap).forEach(([, val]) => {
        const { status } = val as { status: NsGraphStatusCommand.StatusEnum }
        if (status === NsGraphStatusCommand.StatusEnum.PROCESSING) {
          val.status = NsGraphStatusCommand.StatusEnum.ERROR
        }
      })
      return {
        graphStatus: NsGraphStatusCommand.StatusEnum.ERROR,
        statusMap: statusMap,
      }
    }
}
