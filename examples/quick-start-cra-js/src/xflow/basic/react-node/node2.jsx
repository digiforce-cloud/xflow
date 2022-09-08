import React from 'react'
import { useAppContext } from '@digiforce-cloud/xflow'
import './node2.less'

const Node2 = props => {
  const ctx = useAppContext()

  return (
    <div className="node2-container">
      <div>{'React节点2'}</div>
    </div>
  )
}
export default Node2
