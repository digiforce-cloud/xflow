import type { IGraphCommand } from '../command/interface'

/** 节点命令 */
export namespace XFlowNodeCommands {
  const category = 'Node Actions'
  /** 新增节点 */
  export const ADD_NODE: IGraphCommand = {
    id: 'xflow:add-node',
    label: 'Add Node',
    category,
  }
  /** 删除节点 */
  export const DEL_NODE: IGraphCommand = {
    id: 'xflow:del-node',
    label: 'Delete Node',
    category,
  }
  /** 更新链接桩 */
  export const UPDATE_NODE_PORT: IGraphCommand = {
    id: 'xflow:update-node-port',
    label: 'Update Port',
    category,
  }
  /** 更新节点 */
  export const UPDATE_NODE: IGraphCommand = {
    id: 'xflow:update-node',
    label: 'Update Node',
    category,
  }
  /** 节点交互：高亮节点 */
  export const HIGHLIGHT_NODE: IGraphCommand = {
    id: 'xflow:highlight-node',
    label: 'Highlight Node',
    category,
  }
  /** 节点交互：选中节点 */
  export const SELECT_NODE: IGraphCommand = {
    id: 'xflow:select-node',
    label: 'Select Node',
    category,
  }
  /** 移动节点 */
  export const MOVE_NODE: IGraphCommand = {
    id: 'xflow:move-node',
    label: 'Move Node',
    category,
  }
  /** 节点居中 */
  export const CENTER_NODE: IGraphCommand = {
    id: 'xflow:center-node',
    label: 'Center Node',
    category,
  }
  /** 节点前置：调整zindex */
  export const FRONT_NODE: IGraphCommand = {
    id: 'xflow:front-node',
    label: 'Node To Front',
    category,
  }
  /** 节点后置：调整zindex */
  export const BACK_NODE: IGraphCommand = {
    id: 'xflow:back-node',
    label: 'Node To Back',
    category,
  }
}

/** 边命令 */
export namespace XFlowEdgeCommands {
  const category = 'Edge Actions'
  /** 新增边 */
  export const ADD_EDGE: IGraphCommand = {
    id: 'xflow:add-edge',
    label: 'Add Edge',
    category,
  }
  /** 删除边 */
  export const DEL_EDGE: IGraphCommand = {
    id: 'xflow:del-edge',
    label: 'Delete Edge',
    category,
  }
  /** 更新边 */
  export const UPDATE_EDGE: IGraphCommand = {
    id: 'xflow:update-edge',
    label: 'Update Edge',
    category,
  }
  /** 高亮边 */
  export const HIGHLIGHT_EDGE: IGraphCommand = {
    id: 'xflow:highlight-edge',
    label: 'Highlight Edge',
    category,
  }
  /** 边前置：调整zindex */
  export const FRONT_EDGE: IGraphCommand = {
    id: 'xflow:front-edge',
    label: 'Edge To Front',
    category,
  }
  /** 边后置：调整zindex */
  export const BACK_EDGE: IGraphCommand = {
    id: 'xflow:back-edge',
    label: 'Edge To Back',
    category,
  }
}

/** 画布命令 */
export namespace XFlowGraphCommands {
  const category = 'Graph Actions'
  /** LOAD 元数据操作 */
  export const LOAD_META: IGraphCommand = {
    id: 'xflow:load-meta',
    label: 'Load Meta',
    category,
  }
  /** LOAD DATA操作 */
  export const LOAD_DATA: IGraphCommand = {
    id: 'xflow:load-data',
    label: 'Load Data',
    category,
  }
  /** SAVE GRAPH DATA操作 */
  export const SAVE_GRAPH_DATA: IGraphCommand = {
    id: 'xflow:save-graph-data',
    label: 'Save',
    category,
  }
  /** LAYOUT */
  export const GRAPH_LAYOUT: IGraphCommand = {
    id: 'xflow:layout',
    label: 'Layout',
    category,
  }
  /** Graph Render */
  export const GRAPH_RENDER: IGraphCommand = {
    id: 'xflow:graph-render',
    label: 'Graph Render',
    category,
  }
  /** UNDO 操作 */
  export const UNDO_CMD: IGraphCommand = {
    id: 'xflow:undo-cmd',
    label: 'Undo',
    category,
  }
  /** REDO 操作 */
  export const REDO_CMD: IGraphCommand = {
    id: 'xflow:redo-cmd',
    label: 'Redo',
    category,
  }
  /** Graph General Operations: XFlow命令不满足的可以用这个命令，直接使用Graph的api */
  export const GRAPH_INSTANCE_COMMAND: IGraphCommand = {
    id: 'xflow:graph-instacne-cmd',
    label: 'General Command',
    category,
  }
  /** Graph Zoom */
  export const GRAPH_ZOOM: IGraphCommand = {
    id: 'xflow:graph-zoom',
    label: 'Zoom',
    category,
  }
  /** Graph Fullscreen */
  export const GRAPH_FULLSCREEN: IGraphCommand = {
    id: 'xflow:graph-fullscreen',
    label: 'Fullscreen',
    category,
  }
  /** Graph Resize */
  export const GRAPH_RESIZE: IGraphCommand = {
    id: 'xflow:graph-resize',
    label: 'Resize',
    category,
  }
  /** Graph Copy */
  export const GRAPH_COPY: IGraphCommand = {
    id: 'xflow:graph-copy-selection',
    label: 'Copy Selection',
    category,
  }
  /** Graph Paste */
  export const GRAPH_PASTE: IGraphCommand = {
    id: 'xflow:graph-paste-selection',
    label: 'Paste Selection',
    category,
  }
  /** Graph 开启框选 */
  export const GRAPH_TOGGLE_MULTI_SELECT: IGraphCommand = {
    id: 'xflow:graph-toggle-multi-select',
    label: 'Toggle Multi Select',
    category,
  }
  /** 新增 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
  export const GRAPH_ADD_TOOL: IGraphCommand = {
    id: 'xflow:add-tool',
    label: 'Add Tool',
    category,
  }
  /** 删除 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
  export const GRAPH_DEL_TOOL: IGraphCommand = {
    id: 'xflow:del-tool',
    label: 'Delete Tool',
    category,
  }
  /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95 */
  export const GRAPH_HISTORY_UNDO: IGraphCommand = {
    id: 'xflow:history-undo',
    label: 'History Undo',
    category,
  }
  /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
  export const GRAPH_HISTORY_REDO: IGraphCommand = {
    id: 'xflow:history-redo',
    label: 'History Redo',
    category,
  }
  /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
  export const GRAPH_HISTORY_RESET: IGraphCommand = {
    id: 'xflow:history-reset',
    label: 'History Reset',
    category,
  }
  /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
  export const GRAPH_HISTORY_TOGGLE: IGraphCommand = {
    id: 'xflow:history-toggle',
    label: 'History Toggle',
    category,
  }
}

/** 全局状态 */
export namespace XFlowModelCommands {
  const category = 'Model Actions'
  /** Update model 操作 */
  export const UPDATE_MODEL: IGraphCommand = {
    id: 'xflow:update-model',
    label: 'Update Model',
    category,
  }
}

/** 全局状态 */
export namespace XFlowGroupCommands {
  const category = 'Group Actions'
  /** 初始化群组操作 */
  export const INIT_GROUP: IGraphCommand = {
    id: 'xflow:init-group',
    label: 'Init Group',
    category,
  }
  /** ADD GROUP 操作 */
  export const ADD_GROUP: IGraphCommand = {
    id: 'xflow:add-group',
    label: 'Add Group',
    category,
  }
  /** DELETE GROUP 操作 */
  export const DEL_GROUP: IGraphCommand = {
    id: 'xflow:del-group',
    label: 'Delete Group',
    category,
  }
  /** 折叠操作 */
  export const COLLAPSE_GROUP: IGraphCommand = {
    id: 'xflow:collapse-group',
    label: 'Collapse Group',
    category,
  }
}
