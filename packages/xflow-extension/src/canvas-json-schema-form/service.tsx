import React from 'react'
import {
  useXFlowApp,
  DisposableCollection,
  createComponentModel,
} from '@digiforce-cloud/xflow-core'
import type {
  NsModelServiceCmd,
  IGraphCommandService,
  IModelService,
} from '@digiforce-cloud/xflow-core'
import { XFlowModelCommands, Disposable, MODELS } from '@digiforce-cloud/xflow-core'
import type { IProps, ISchema, TargetType, TargetData } from './interface'
import type { Cell } from '@digiforce-cloud/x6'

export namespace NsJsonSchemaFormModel {
  export const id = 'XFLOW_JSON_SCHEMA_FORM'
  export interface IState {
    loading: boolean
    schema: ISchema
    targetType: TargetType
    targetData: TargetData
    targetCell: Cell | null
  }
  export const useModel = async (model: IModelService) => {
    return model.awaitModel<IState>(id)
  }
}

/** 方便其他组件执行Command改变Panel内部状态 */
export const executeJsonSchemaFormCommand = (
  cmds: IGraphCommandService,
  updateModel: (state: NsJsonSchemaFormModel.IState) => Promise<void>,
) => {
  cmds.executeCommand<NsModelServiceCmd.UpdateModelCommand.IArgs<NsJsonSchemaFormModel.IState>>(
    XFlowModelCommands.UPDATE_MODEL.id,
    {
      getModel: async modelService => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return NsJsonSchemaFormModel.useModel(modelService)
      },
      updateModel: updateModel,
    },
  )
}

export const useJsonSchemaFormModel = (props: IProps) => {
  const app = useXFlowApp()
  const { commandService, modelService, getGraphInstance } = app
  const { formSchemaService } = props

  const [state, setState, model, isModelReady] = createComponentModel<NsJsonSchemaFormModel.IState>(
    {
      schema: { tabs: [] },
      targetType: null,
      targetData: null,
      targetCell: null,
      loading: false,
    },
  )
  /** 注册全局的model */
  React.useEffect(() => {
    if (!app || !app.modelService) {
      return
    }
    const toDispose = new DisposableCollection()
    const deferredModel = app.modelService.findDeferredModel(NsJsonSchemaFormModel.id)
    if (!deferredModel) {
      const d = app.modelService.registerModel({
        id: NsJsonSchemaFormModel.id,
        modelFactory: () => model,
        /** 监听SELECTED_CELL的变化 */
        watchChange: async (self, modelSerccie) => {
          const selectedCellModel = await MODELS.SELECTED_CELL.getModel(modelSerccie)
          const nodeDisposable = selectedCellModel.watch(async cell => {
            const updateState = async (targetCell: Cell | null, type: TargetType) => {
              self.setValue(m => {
                m.loading = true
                m.schema = { tabs: [] }
                m.targetType = null
                m.targetData = null
                m.targetCell = null
              })
              const targetData = targetCell ? targetCell.getData() : null
              if (!formSchemaService) {
                return
              }
              const graph = await getGraphInstance()
              const schema = await formSchemaService({
                commandService,
                modelService,
                targetData,
                cell: targetCell,
                targetType: type,
                graph,
              })
              self.setValue({
                loading: false,
                schema: schema,
                targetType: type,
                targetCell: targetCell,
                targetData: targetData,
              })
            }
            const getCellType = (targetCell: Cell): TargetType => {
              if (!targetCell) {
                return 'canvas'
              } else if (
                targetCell.isNode &&
                targetCell.isNode() &&
                targetCell.getProp('isGroup')
              ) {
                return 'group'
              } else if (targetCell.isNode && targetCell.isNode()) {
                return 'node'
              } else if (targetCell.isEdge && targetCell.isEdge()) {
                return 'edge'
              } else {
                return 'canvas'
              }
            }
            const targetCellType = getCellType(cell)
            if ((props.targetType || ['node', 'canvas']).includes(targetCellType)) {
              await updateState(cell, targetCellType)
            }
          })
          return Disposable.create(() => {
            nodeDisposable.dispose()
            toDispose.push(nodeDisposable)
          })
        },
      })
      toDispose.push(d)
    }
    return () => {
      toDispose.dispose()
    }
    /* eslint-disable-next-line  */
  }, [])

  return { commandService, modelService, state, setState, model, isModelReady }
}
