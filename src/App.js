import * as THREE from 'three'
import { MathUtils } from 'three'
import { useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Float, useGLTF, BakeShadows, ContactShadows, Backdrop, MeshReflectorMaterial,Stage } from '@react-three/drei'
import { LayerMaterial, Base, Depth } from 'lamina'

import suzanne from '../src/suzanne.glb'
import drago from '../src/drago.gltf'
import lambo from '../src/lambo.glb'

export const App = () => (
  <Canvas shadows dpr={[1, 2]} camera={{ position: [-10, 0, 15], fov: 30 }}>
    {/* Render models */}
    <Suzzane />
    <Stage environment={null} intensity={0.5} contactShadow={false} shadowBias={-0.0015} scale={1.0} position-x={-0.5} position-y={-0.2}  position-z={0} >
    </Stage> 
    <Lambo scale={0.01}  position-x={-0.5} position-y={-0.5}  position-z={1}  rotation={[0, Math.PI / 8, 0]} />                                                       
    <Dragon scale={1.0} position={[2.2, -0.27, 1.8]} rotation={[0, Math.PI / 1.7, 0]} /> 
    <spotLight position={[1, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
    <ambientLight intensity={0.2} />
    <ContactShadows resolution={1024} frames={1} position={[-0.03, -1.16, -0.1]} scale={10} blur={3} opacity={1} far={10} />

    {/* Renders contents "live" into a HDRI environment (scene.environment). */}
    <Environment frames={Infinity} resolution={256}>

      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <CameraMovements />

      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />

      {/* Leftside (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>

      {/* Background and textures */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Base color="#444" alpha={1} mode="normal" />
          <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
        <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1080}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
      </mesh>
    </Environment>

    {/* Background curtain */}
    <Backdrop castShadow floor={2} position={[0, -1.5, -3]} scale={[10, 5, 4]}>
      <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
    </Backdrop>
    <BakeShadows />
    <ManageCamera />
  </Canvas> 
)

function Suzzane() {
  const { nodes } = useGLTF(suzanne)
  return (
    <>
      <group scale={0.6} position-y={-0.85} position-x={-2.0} position-z={3.4} rotation={[0, Math.PI / 6.9, 0]} >
        <mesh castShadow rotation={[MathUtils.degToRad(-35), 0, 0]} geometry={nodes.Suzanne.geometry} >
          <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} color="#6B6B6B" />
        </mesh>
      </group>
    </>
  )
}

function Dragon(props) {
  const { nodes } = useGLTF(drago)
  return (
    <group position-y={-0.9}>
      <mesh castShadow receiveShadow geometry={nodes.dragon.geometry} {...props} dispose={null}>
        <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} color="#4B2C27" />
      </mesh>
    </group>
  )
}

function Lambo(props) {
  const { scene, nodes, materials } = useGLTF(lambo)
  useLayoutEffect(() => {
    scene.traverse((obj) => obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true))
    Object.assign(nodes.wheel003_020_2_Chrome_0.material, { metalness: 0.9, roughness: 0.4, color: new THREE.Color('#020202') })
    Object.assign(materials.WhiteCar, { roughness: 0.0, metalness: 0.3, emissive: new THREE.Color('#500000'), envMapIntensity: 0.5 })
  }, [scene, nodes, materials])
  return <primitive object={scene} {...props} />
}

function ManageCamera({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 10 + Math.cos(t / 5)), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}

function CameraMovements({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 15) > 60 && (group.current.position.z = -60))
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
        ))}
      </group>
    </group>
  )
}