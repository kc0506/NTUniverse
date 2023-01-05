//@ts-nocheck

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 ./barriers.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { modelBase } from './Demo'

export default function Barriers(props) {
  const { nodes, materials } = useGLTF(modelBase + '/barriers.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.signs.geometry} material={materials['Material.022']} position={[27.03, 2.08, 0.04]} rotation={[Math.PI / 2, 0, 1.4]} scale={0} />
      <mesh geometry={nodes.DP_HWS_RoadCone_1.geometry} material={materials['DP_HWS_RoadCone_1-2']} position={[-0.84, 2.19, -22.31]} rotation={[0, -0.44, 0]} scale={0.14} />
      <mesh geometry={nodes.DP_HWS_RoadDrum_1.geometry} material={materials.DP_HWS_RoadDrum_1} position={[21.53, 2.04, -2.78]} scale={0.06} />
      <mesh geometry={nodes.DP_HWS_SignHardturn_2.geometry} material={materials['DP_HWS_SignHardturn_1-2']} position={[2.7, 2.26, -19.24]} rotation={[0, 0.69, 0]} scale={0.08} />
      <mesh geometry={nodes.GuardRail_Highway_2.geometry} material={materials['GuardRail_Highway_1-2']} position={[20.42, 2.47, -2.12]} rotation={[0, -0.84, 0]} scale={1.58} />
      <mesh geometry={nodes.GuardRail_Highway_1.geometry} material={materials['GuardRail_Highway_1-2']} position={[21.52, 2.59, 2.29]} rotation={[0, -1.45, 0]} scale={1.55} />
      <mesh geometry={nodes.SP_CCS_ConcreteBlock_1.geometry} material={materials['SP_CCS_ConcreteBlock_1-2']} position={[-1.65, 2.04, -20.62]} rotation={[0, -0.48, 0]} scale={0.04} />
      <mesh geometry={nodes.SP_HWS_RoadBarrier_1.geometry} material={materials.SP_HWS_RoadBarrier_1} position={[23.49, 2.58, -0.51]} rotation={[0, -1.24, 0]} scale={0.04} />
      <mesh geometry={nodes.DP_HWS_RoadCone_1001.geometry} material={materials['DP_HWS_RoadCone_1-2']} position={[1.78, 2.59, -19.97]} rotation={[0, -1.56, 0]} scale={0.14} />
    </group>
  )
}

