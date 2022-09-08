import type { NsNodeCmd, IGraphCommandService, NsGraph } from '@digiforce-cloud/xflow'
import { XFlowNodeCommands, uuidv4 } from '@digiforce-cloud/xflow'

export const addNode = (cmd: IGraphCommandService, nodeConfig: NsGraph.INodeConfig) => {
  return cmd.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
    nodeConfig: { ...nodeConfig, id: uuidv4(), width: 190, height: 32 },
  })
}
