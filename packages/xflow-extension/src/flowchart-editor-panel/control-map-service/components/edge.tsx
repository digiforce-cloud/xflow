import React, { useState, useEffect } from 'react'
import { FlowchartFormWrapper } from '../../form-wrapper'
import { ColorPicker, InputNumberFiled, InputFiled, SelectField } from './fields'
import { PREFIX, DefaultEdgeConfig, ArrowStrokeMaps, ArrowMaps } from './constants'

export type MarkerCfg = {
  width?: number
  height?: number
  name?: string
}
export interface IConfig {
  label?: string
  attrs?: {
    line?: {
      fontSize?: number
      fontFill?: string
      strokeWidth?: number
      sourceMarker?: MarkerCfg
      targetMarker?: MarkerCfg
      strokeDasharray?: number[]
    }
  }
}

const EdgeComponent = props => {
  const { config, plugin = {} } = props
  const { updateEdge } = plugin

  const [edgeConfig, setEdgeConfig] = useState<IConfig>({
    ...DefaultEdgeConfig,
    ...config,
  })

  useEffect(() => {
    setEdgeConfig({
      ...DefaultEdgeConfig,
      ...config,
    })
  }, [config])

  const getAttrs = (key: string, type = 'line') => {
    const { attrs = {} } = edgeConfig
    return attrs[type]?.[key]
  }

  const getArrowValue = () => {
    const { attrs = {} } = edgeConfig
    const { line = {} } = attrs
    if (line.sourceMarker?.name && line.targetMarker?.name) {
      return 'all'
    }
    if (!line.sourceMarker?.name && !line.targetMarker?.name) {
      return 'none'
    }
    if (line.sourceMarker?.name) {
      return 'source'
    }
    return 'target'
  }

  const getSrokeDashValue = () => {
    const { attrs = {} } = edgeConfig
    const { line = {} } = attrs
    return line.strokeDasharray ? 'dash' : 'solid'
  }

  const onEdgeConfigChange = (
    key: string,
    value: number | string | object,
    type: string = 'line',
  ) => {
    /** 全量更新，简化逻辑 */
    if (key === 'arrow') {
      setEdgeConfig({
        ...edgeConfig,
        attrs: {
          ...edgeConfig.attrs,
          [type]: {
            ...edgeConfig.attrs?.[type],
            ...(value as object),
          },
        },
      })
    } else {
      setEdgeConfig({
        ...edgeConfig,
        [key]: value,
        attrs: {
          ...edgeConfig.attrs,
          [type]: {
            ...edgeConfig.attrs?.[type],
            [key]: value,
          },
        },
      })
    }

    updateEdge(
      {
        [key]: value,
      },
      type,
      key === 'arrow' ? 'arrow' : '',
    )
  }

  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`}>
        <h5>Content</h5>
        <InputFiled
          label="Label"
          value={edgeConfig.label}
          onChange={value => {
            onEdgeConfigChange('label', value)
          }}
        />
      </div>
      <h5 style={{ marginBottom: 12 }}>Style</h5>
      <div className={`${PREFIX}-panel-group`} style={{ marginBottom: 0 }}>
        <h5>Line</h5>
        <SelectField
          label="Arrow"
          value={getArrowValue()}
          width="100%"
          options={[
            {
              label: 'Target',
              value: 'target',
            },
            {
              label: 'Sourcce',
              value: 'source',
            },
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'None',
              value: 'none',
            },
          ]}
          onChange={value => {
            onEdgeConfigChange('arrow', ArrowMaps[value], 'line')
          }}
        />

        <div className={`${PREFIX}-edge-stroke-style`}>
          <SelectField
            label="Stroke"
            width={68}
            value={getSrokeDashValue()}
            options={[
              {
                label: 'Solid',
                value: 'solid',
              },
              {
                label: 'Dash',
                value: 'dash',
              },
            ]}
            onChange={value => {
              onEdgeConfigChange('strokeDasharray', ArrowStrokeMaps[value], 'line')
            }}
          />
          <InputNumberFiled
            value={getAttrs('strokeWidth')}
            min={1}
            onChange={value => {
              onEdgeConfigChange('strokeWidth', value, 'line')
            }}
          />
        </div>
        <ColorPicker
          label="Line Color"
          value={getAttrs('stroke')}
          onChange={(value: string) => {
            onEdgeConfigChange('stroke', value, 'line')
          }}
        />
      </div>
      <div className={`${PREFIX}-panel-group`}>
        <h5>Label</h5>
        <div className={`${PREFIX}-edge-text-style`}>
          <InputNumberFiled
            label="Font"
            min={10}
            width={68}
            value={getAttrs('fontSize', 'text') || 12}
            onChange={value => {
              onEdgeConfigChange('fontSize', value, 'text')
            }}
          />
          <ColorPicker
            value={getAttrs('fill', 'text') || '#000'}
            onChange={(value: string) => {
              onEdgeConfigChange('fill', value, 'text')
            }}
          />
        </div>
      </div>
    </div>
  )
}
export const EdgeService: React.FC<any> = props => {
  return (
    <FlowchartFormWrapper {...props} type="edge">
      {(config, plugin) => <EdgeComponent {...props} plugin={plugin} config={config} />}
    </FlowchartFormWrapper>
  )
}
