import { useGSAP } from '@gsap/react';
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: Record<string, THREE.Mesh>
    materials: Record<string, THREE.Material>
}

const BakeryShop = ({ ...props }) => {
    const { nodes, materials } = useGLTF('./models/bakery_shop.glb') as GLTFResult

    const modelRef = useRef(null);

    useGSAP(() => {
        gsap.to(modelRef?.current?.rotation, {
            y: -1,
            duration: 1,
            ease: "power4.out",
        })
    })


    return (
        <group
            position={[0, -0.7, 4]}
            scale={[1, 1.2, 1]}
            ref={modelRef} {...props} dispose={null}>
            <group
                position={[1.811, 1.258, 4.09]}
                rotation={[-1.07, -0.047, -1.612]}
                scale={[0.384, 0.419, 0.399]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_138.geometry}
                    material={materials['Material.025']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_139.geometry}
                    material={materials['Material.025']}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_94.geometry}
                material={materials['Material.035']}
                position={[3.633, 1.179, 2.217]}
                scale={0.232}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_96.geometry}
                material={materials['Material.035']}
                position={[3.468, 1.152, 1.009]}
                scale={0.16}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_104.geometry}
                material={materials['Material.035']}
                position={[3.973, 1.156, 3.403]}
                scale={0.08}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_126.geometry}
                material={materials['Material.035']}
                position={[1.807, 1.159, 4.149]}
                scale={0.232}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_128.geometry}
                material={materials['Material.035']}
                position={[1.041, 1.157, 3.95]}
                scale={0.16}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_136.geometry}
                material={materials['Material.035']}
                position={[-0.62, 1.146, 4.113]}
                scale={0.344}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_88.geometry}
                material={materials['Material.035']}
                position={[3.49, 1.161, 3.264]}
                scale={0.196}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials['Material.002']}
                position={[-0.216, -0.874, 0.167]}
                scale={[1.491, 1.569, 1.569]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_8.geometry}
                material={materials['Material.003']}
                position={[-1.603, 0.965, -0.456]}
                scale={[1.529, 4.255, 1.744]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials['Material.004']}
                position={[-0.012, 3.178, 0.167]}
                scale={1.569}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_12.geometry}
                material={materials['Material.028']}
                position={[-0.574, 2.099, -0.439]}
                scale={[1.578, 1.529, 1.573]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_201.geometry}
                material={materials['Material.042']}
                position={[1.512, 1.187, -4.318]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.471, -0.156, -0.214]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_18.geometry}
                material={materials['Material.005']}
                position={[-0.012, -0.874, 0.167]}
                scale={1.569}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_50.geometry}
                material={materials['Material.021']}
                position={[-0.909, 3.074, -0.004]}
                scale={[0.847, 0.847, 1.055]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_58.geometry}
                material={materials['Material.021']}
                position={[-3.021, 3.018, -0.424]}
                rotation={[0, -1.495, 0]}
                scale={[0.688, 0.688, 0.857]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_62.geometry}
                material={materials['Material.021']}
                position={[-0.873, 3.074, -1.012]}
                rotation={[Math.PI, -0.005, Math.PI]}
                scale={[0.847, 0.847, 1.055]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_203.geometry}
                material={materials['Material.042']}
                position={[2.491, 1.187, -3.841]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.453, -0.167, -0.176]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_205.geometry}
                material={materials['Material.042']}
                position={[2.491, 1.187, -4.292]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.426, -0.175, -0.197]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_267.geometry}
                material={materials['Material.021']}
                position={[3.626, 1.325, 0.231]}
                rotation={[0, -0.009, 0]}
                scale={[0.688, 0.688, 0.857]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_207.geometry}
                material={materials['Material.042']}
                position={[3.288, 1.187, -4.067]}
                rotation={[2.688, -1.492, 2.69]}
                scale={[-0.312, -0.169, -0.182]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_209.geometry}
                material={materials['Material.042']}
                position={[3.695, 1.187, -4.067]}
                rotation={[2.688, -1.492, 2.69]}
                scale={[-0.337, -0.169, -0.175]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_86.geometry}
                material={materials['Material.042']}
                position={[1.512, 1.187, -3.841]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.428, -0.166, -0.185]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_211.geometry}
                material={materials['Material.042']}
                position={[1.512, 0.46, -3.841]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.425, -0.156, -0.196]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_213.geometry}
                material={materials['Material.042']}
                position={[1.512, 0.46, -4.318]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.468, -0.172, -0.18]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_215.geometry}
                material={materials['Material.042']}
                position={[2.491, 0.46, -3.841]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.417, -0.158, -0.21]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_217.geometry}
                material={materials['Material.042']}
                position={[2.491, 0.46, -4.292]}
                rotation={[0.034, 0.003, 0.001]}
                scale={[-0.423, -0.164, -0.213]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_106.geometry}
                material={materials['Material.006']}
                position={[-4.398, 4.063, -0.134]}
                scale={0.439}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_108.geometry}
                material={materials['Material.003']}
                position={[-5.277, 2.221, 2.635]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.008, -3.086, -1.742]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_110.geometry}
                material={materials['Material.032']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_112.geometry}
                material={materials['Material.003']}
                position={[-5.256, 4.392, -0.182]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.202, -1, -1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_114.geometry}
                material={materials['Material.031']}
                position={[-5.194, 5.331, 0.813]}
                scale={0.034}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_219.geometry}
                material={materials['Material.042']}
                position={[3.288, 0.46, -4.067]}
                rotation={[2.688, -1.492, 2.69]}
                scale={[-0.316, -0.163, -0.175]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_120.geometry}
                material={materials['Material.033']}
                position={[0.453, 1.064, 4.048]}
                rotation={[0, 1.571, 0]}
                scale={[0.647, 0.088, 2.078]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_145.geometry}
                material={materials['Material.005']}
                position={[-0.647, -1.148, 1.64]}
                scale={[4.818, 3.746, 4.85]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_221.geometry}
                material={materials['Material.042']}
                position={[3.695, 0.46, -4.067]}
                rotation={[2.688, -1.492, 2.69]}
                scale={[-0.351, -0.169, -0.208]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_273.geometry}
                material={materials['Material.045']}
                position={[-4.08, -0.833, 2.808]}
                scale={[1, 0.096, 1.896]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_275.geometry}
                material={materials['Material.007']}
                position={[-3.691, 1.348, 0.067]}
                scale={[0.22, 0.046, 0.22]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_277.geometry}
                material={materials['Material.046']}
                position={[-4.048, 0.059, -4.29]}
                scale={[1.129, 1, 0.504]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_283.geometry}
                material={materials['Material.005']}
                position={[-0.406, 2.957, 0.167]}
                scale={[4.875, 3.791, 4.908]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials['Material.001']}
                position={[-0.406, 2.957, 0.167]}
                scale={[4.875, 3.791, 4.908]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16.geometry}
                material={materials['Material.033']}
                position={[3.511, 0.373, 1.549]}
                rotation={[-Math.PI, 0, 0]}
                scale={[0.598, 0.142, 0.598]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_20.geometry}
                material={materials['Material.005']}
                position={[-0.012, -0.874, 0.167]}
                scale={1.569}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_153.geometry}
                material={materials['Material.029']}
                position={[-0.6, 1.465, 4.102]}
                rotation={[0, 1.009, 0]}
                scale={-0.361}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_155.geometry}
                material={materials['Material.014']}
                position={[3.636, 1.228, 2.213]}
                rotation={[-Math.PI, 1.005, -Math.PI]}
                scale={[0.199, 0.045, 0.199]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_159.geometry}
                material={materials['Material.037']}
                position={[3.975, 1.26, 3.401]}
                scale={0.115}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_161.geometry}
                material={materials['Material.037']}
                position={[3.283, 1.185, 2.656]}
                scale={0.083}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_163.geometry}
                material={materials['Material.038']}
                position={[3.283, 1.205, 2.656]}
                scale={0.083}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_157.geometry}
                material={materials['Material.034']}
                position={[3.522, 0.264, 1.572]}
                rotation={[-Math.PI, -Math.PI / 2, 0]}
                scale={[0.598, 0.168, 0.598]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_167.geometry}
                material={materials['Material.037']}
                position={[3.283, 1.214, 2.656]}
                scale={0.083}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_165.geometry}
                material={materials['Material.037']}
                position={[1.359, 1.234, 4.397]}
                scale={0.125}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_72.geometry}
                material={materials['Material.017']}
                position={[-2.08, 2.896, 0.167]}
                rotation={[0, -0.223, 0]}
                scale={[0.152, 0.174, 0.152]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_223.geometry}
                material={materials['Material.007']}
                position={[-2.106, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_225.geometry}
                material={materials['Material.043']}
                position={[-1.486, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_285.geometry}
                material={materials['Material.006']}
                position={[-1.631, 1.42, -0.6]}
                rotation={[-Math.PI, 1.398, -Math.PI]}
                scale={[0.152, 0.174, 0.152]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_227.geometry}
                material={materials['Material.044']}
                position={[-1.486, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_229.geometry}
                material={materials['Material.007']}
                position={[-1.486, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_231.geometry}
                material={materials['Material.043']}
                position={[-0.846, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_233.geometry}
                material={materials['Material.044']}
                position={[-0.846, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_74.geometry}
                material={materials['Material.017']}
                position={[1.896, 2.932, -1.08]}
                rotation={[0, -0.999, 0]}
                scale={0.152}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_235.geometry}
                material={materials['Material.007']}
                position={[-0.846, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_287.geometry}
                material={materials['Material.012']}
                position={[-0.833, 1.452, -1.233]}
                scale={0.124}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_289.geometry}
                material={materials['Material.008']}
                position={[-0.833, 1.422, -1.233]}
                scale={[0.124, 0.142, 0.124]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_237.geometry}
                material={materials['Material.043']}
                position={[-0.164, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_239.geometry}
                material={materials['Material.044']}
                position={[-0.164, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_241.geometry}
                material={materials['Material.007']}
                position={[-0.164, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_243.geometry}
                material={materials['Material.043']}
                position={[1.434, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_245.geometry}
                material={materials['Material.044']}
                position={[1.434, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_247.geometry}
                material={materials['Material.007']}
                position={[1.434, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_249.geometry}
                material={materials['Material.043']}
                position={[2.007, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_251.geometry}
                material={materials['Material.044']}
                position={[2.007, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_253.geometry}
                material={materials['Material.007']}
                position={[2.007, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_255.geometry}
                material={materials['Material.043']}
                position={[2.629, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_257.geometry}
                material={materials['Material.044']}
                position={[2.629, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_259.geometry}
                material={materials['Material.007']}
                position={[2.629, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_261.geometry}
                material={materials['Material.043']}
                position={[3.273, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_263.geometry}
                material={materials['Material.044']}
                position={[3.273, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_265.geometry}
                material={materials['Material.007']}
                position={[3.273, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_22.geometry}
                material={materials['Material.006']}
                position={[-0.554, 1.42, -0.663]}
                rotation={[0, -0.223, 0]}
                scale={[0.152, 0.174, 0.152]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_24.geometry}
                material={materials['Material.017']}
                position={[-0.426, 1.456, -1.062]}
                rotation={[0, -0.555, 0]}
                scale={0.152}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_279.geometry}
                material={materials['Material.048']}
                position={[3.568, -0.224, -2.175]}
                rotation={[0, 1.424, 0]}
                scale={0.643}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_281.geometry}
                material={materials['Material.021']}
                position={[3.568, -0.279, -2.175]}
                rotation={[0, 1.424, 0]}
                scale={0.68}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_26.geometry}
                material={materials['Material.016']}
                position={[0.271, 1.42, -0.855]}
                rotation={[0, -0.759, 0]}
                scale={[0.152, 0.174, 0.152]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_28.geometry}
                material={materials['Material.010']}
                position={[-0.412, 1.394, 0.28]}
                rotation={[-Math.PI, 1.005, -Math.PI]}
                scale={[0.18, 0.041, 0.18]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_30.geometry}
                material={materials['Material.009']}
                position={[1.253, 1.409, -0.97]}
                rotation={[1.562, 0, 0]}
                scale={[0.085, 0.242, 0.085]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_32.geometry}
                material={materials['Material.010']}
                position={[0.932, 1.409, 0.397]}
                rotation={[Math.PI / 2, 0.009, -Math.PI / 2]}
                scale={[0.085, 0.242, 0.085]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_151.geometry}
                material={materials['Material.009']}
                position={[0.074, 1.397, 0.157]}
                rotation={[Math.PI, -0.182, Math.PI]}
                scale={[0.18, 0.041, 0.18]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_34.geometry}
                material={materials['Material.026']}
                position={[0.956, 2.918, -0.394]}
                scale={-0.076}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_36.geometry}
                material={materials['Material.027']}
                position={[0.955, 3.572, -0.395]}
                scale={[-0.081, -0.036, -0.081]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_38.geometry}
                material={materials['Material.007']}
                position={[0.955, 3.576, -0.286]}
                scale={0.117}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_40.geometry}
                material={materials['Material.019']}
                position={[0.955, 3.576, -0.286]}
                scale={0.117}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_48.geometry}
                material={materials['Material.029']}
                position={[1.855, 3.428, 0.094]}
                rotation={[0, 0.332, 0]}
                scale={-0.191}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_54.geometry}
                material={materials['Material.026']}
                position={[-2.229, 2.889, -0.888]}
                scale={-0.053}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_44.geometry}
                material={materials['Material.026']}
                position={[1.837, 2.889, 0.091]}
                scale={-0.053}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_46.geometry}
                material={materials['Material.027']}
                position={[1.837, 3.346, 0.09]}
                scale={[-0.057, -0.025, -0.057]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_56.geometry}
                material={materials['Material.027']}
                position={[-2.229, 3.346, -0.888]}
                scale={[-0.057, -0.025, -0.057]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_68.geometry}
                material={materials['Material.013']}
                position={[-2.233, 3.348, -0.9]}
                scale={[0.162, 0.089, 0.162]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_70.geometry}
                material={materials['Material.039']}
                position={[-2.233, 3.357, -0.9]}
                scale={[0.146, 0.08, 0.146]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_100.geometry}
                material={materials['Material.007']}
                position={[3.636, 1.228, 2.213]}
                rotation={[-Math.PI, 1.005, -Math.PI]}
                scale={[0.199, 0.045, 0.199]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_102.geometry}
                material={materials['Material.008']}
                position={[3.636, 1.228, 2.213]}
                rotation={[-Math.PI, 1.005, -Math.PI]}
                scale={[0.199, 0.045, 0.199]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_122.geometry}
                material={materials['Material.033']}
                position={[1.305, 0.373, 4.226]}
                rotation={[-Math.PI, -Math.PI / 2, 0]}
                scale={[0.598, 0.142, 0.598]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_124.geometry}
                material={materials['Material.033']}
                position={[-0.603, 0.373, 4.206]}
                rotation={[-Math.PI, -Math.PI / 2, 0]}
                scale={[0.598, 0.142, 0.598]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_130.geometry}
                material={materials['Material.036']}
                position={[3.975, 1.26, 3.401]}
                scale={0.115}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_132.geometry}
                material={materials['Material.036']}
                position={[3.283, 1.214, 2.656]}
                scale={0.083}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_134.geometry}
                material={materials['Material.036']}
                position={[1.359, 1.234, 4.397]}
                scale={0.125}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_141.geometry}
                material={materials['Material.033']}
                position={[0.234, 1.298, 4.131]}
                scale={-0.143}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_143.geometry}
                material={materials['Material.021']}
                position={[1.04, 1.241, 3.954]}
                rotation={[0, 0.104, 0]}
                scale={[0.152, 0.174, 0.152]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_147.geometry}
                material={materials['Material.043']}
                position={[-2.106, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_149.geometry}
                material={materials['Material.044']}
                position={[-2.106, 4.336, -4.204]}
                scale={0.23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_14.geometry}
                material={materials['Material.033']}
                position={[3.491, 0.373, 3.052]}
                rotation={[-Math.PI, 0, 0]}
                scale={[0.598, 0.142, 0.598]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_269.geometry}
                material={materials['Material.020']}
                position={[3.642, 1.462, 0.204]}
                rotation={[0, -0.009, 0]}
                scale={[0.873, 0.44, 0.483]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_271.geometry}
                material={materials['Material.025']}
                position={[3.885, 1.341, 0.254]}
                rotation={[-1.805, 0.736, 1.211]}
                scale={0.244}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_52.geometry}
                material={materials['Material.020']}
                position={[-0.89, 3.244, -0.038]}
                scale={[1.075, 0.542, 0.594]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_60.geometry}
                material={materials['Material.020']}
                position={[-2.991, 3.156, -0.411]}
                rotation={[0, -1.495, 0]}
                scale={[0.873, 0.44, 0.483]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_64.geometry}
                material={materials['Material.020']}
                position={[-0.892, 3.244, -0.977]}
                rotation={[Math.PI, -0.005, Math.PI]}
                scale={[1.075, 0.542, 0.594]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_66.geometry}
                material={materials['Material.025']}
                position={[-3.021, 3.035, -0.164]}
                rotation={[-0.834, 0.23, -0.455]}
                scale={0.244}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_76.geometry}
                material={materials['Material.016']}
                position={[1.262, 2.952, 0.139]}
                rotation={[Math.PI, -0.361, Math.PI]}
                scale={0.561}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_78.geometry}
                material={materials['Material.011']}
                position={[1.258, 3.035, 0.139]}
                rotation={[Math.PI, -0.361, Math.PI]}
                scale={0.561}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_80.geometry}
                material={materials['Material.012']}
                position={[0.323, 2.952, -0.276]}
                rotation={[Math.PI, -0.361, Math.PI]}
                scale={0.561}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_82.geometry}
                material={materials['Material.013']}
                position={[0.318, 3.035, -0.276]}
                rotation={[Math.PI, -0.361, Math.PI]}
                scale={0.561}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_90.geometry}
                material={materials['Material.012']}
                position={[3.49, 1.26, 3.261]}
                rotation={[0, 1.348, 0]}
                scale={0.446}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_92.geometry}
                material={materials['Material.013']}
                position={[3.492, 1.327, 3.258]}
                rotation={[0, 1.348, 0]}
                scale={0.446}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_116.geometry}
                material={materials['Material.030']}
                position={[-5.194, 4.537, -0.212]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[0.884, 1, 1.233]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_118.geometry}
                material={materials['Material.030']}
                position={[-5.194, 4.537, 3.885]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[0.884, 1, 1.144]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_84.geometry}
                material={materials['Material.041']}
                position={[3.546, 2.464, -4.192]}
                rotation={[3.031, 0.253, -2.85]}
                scale={[-0.144, -1.135, -0.135]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_185.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_187.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_189.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_191.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_169.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_171.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_173.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_175.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_177.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_179.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_181.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_183.geometry}
                material={materials['Material.040']}
                position={[-1.638, 2.527, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_193.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_195.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_197.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_199.geometry}
                material={materials['Material.040']}
                position={[-1.638, 0.602, -3.958]}
                scale={[0.453, 0.219, 0.453]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_42.geometry}
                material={materials['Material.018']}
                position={[0.952, 3.55, -0.375]}
                rotation={[0, -0.31, 0]}
                scale={-0.03}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_98.geometry}
                material={materials['Material.023']}
                position={[3.455, 1.214, 0.976]}
                rotation={[3.039, 0.007, -3.068]}
                scale={0.206}
            />
        </group>)
}

useGLTF.preload('./models/bakeryShop.glb')

export default BakeryShop