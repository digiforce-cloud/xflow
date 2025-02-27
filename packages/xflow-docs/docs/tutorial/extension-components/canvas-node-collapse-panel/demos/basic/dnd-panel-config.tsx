import type { NsNodeCollapsePanel } from '@digiforce-cloud/xflow'
import React from 'react'
import { XFlowConstants } from '@digiforce-cloud/xflow'
import * as commandUtils from './comannd-utils'

export const DND_RENDER_ID = 'DND_RENDER_ID'

export const onNodeDrop: NsNodeCollapsePanel.IOnNodeDrop = async (nodeConfig, commandService) => {
  commandUtils.addNode(commandService, nodeConfig)
}

export const nodeDataService: NsNodeCollapsePanel.INodeDataService = async (meta, modelService) => {
  console.log(meta, modelService)
  return [
    {
      id: '数据读写',
      header: '数据读写',
      children: [
        {
          id: '2',
          label: '算法组件1',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          popoverContent: <div> 算法组件1的描述 </div>,
        },
        {
          id: '3',
          label: '算法组件2',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          popoverContent: <div> 算法组件2的描述 </div>,
        },
        {
          id: '4',
          label: '算法组件3',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          popoverContent: <div> 算法组件3的描述 </div>,
        },
      ],
    },
    {
      id: '数据加工',
      header: '数据加工',
      children: [
        {
          id: '6',
          label: '算法组件4',
          parentId: '5',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
        {
          id: '7',
          label: '算法组件5',
          parentId: '5',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
        {
          id: '8',
          label: '算法组件6',
          parentId: '5',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
      ],
    },
    {
      id: '模型训练',
      header: '模型训练',
      children: [
        {
          id: '10',
          label: '算法组件7',
          parentId: '9',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          isDisabled: true,
        },
        {
          id: '11',
          label: '算法组件8',
          parentId: '9',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
        {
          id: '12',
          label: '算法组件9',
          parentId: '9',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
      ],
    },
  ]
}
