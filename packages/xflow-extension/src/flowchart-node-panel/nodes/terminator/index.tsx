import React from 'react'
import type { NsGraph } from '@digiforce-cloud/xflow-core'
import { createPath } from '../../utils'
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants'

export const TerminalNode: NsGraph.INodeRender = props => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props
  const {
    stroke = DefaultNodeConfig.stroke,
    label = DefaultNodeConfig.label,
    fill = DefaultNodeConfig.fill,
    fontFill = DefaultNodeConfig.fontFill,
    fontSize = DefaultNodeConfig.fontSize,
  } = data
  const { width, height } = size
  const rx = Math.min(height, width) / 2
  const path = [
    ['M', rx, NODE_PADDING], // top-left
    ['L', width - rx, NODE_PADDING], // top-right
    ['C', width - 2 * NODE_PADDING, NODE_PADDING, width - 2 * NODE_PADDING, height / 2],
    ['', width - 2 * NODE_PADDING, height / 2],
    [
      'C',
      width - 2 * NODE_PADDING,
      height / 2,
      width - 2 * NODE_PADDING,
      height - 2 * NODE_PADDING,
    ],
    ['', width - rx, height - 2 * NODE_PADDING], // bottom-right
    ['L', rx, height - 2 * NODE_PADDING], // bottom-left
    ['C', NODE_PADDING, height - 2 * NODE_PADDING, NODE_PADDING, height / 2],
    ['', NODE_PADDING, height / 2],
    ['C', NODE_PADDING, height / 2, NODE_PADDING, NODE_PADDING],
    ['', rx, NODE_PADDING],
  ]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      {/* 一次注册，多次调用 */}
      {/* <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="#fff" />
        </filter>
      </defs> */}
      <path d={createPath(path)} fill={fill} stroke={stroke} />
      <text
        x={width / 2}
        y={height / 2}
        fill={fontFill}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={fontSize}
      >
        {label}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  )
}
