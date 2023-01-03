import { usePlane } from "@react-three/cannon"
import { useControls } from "leva";
import { RefObject } from "react";
import { Group } from "three";



export default function Ground(props: any) {

    const [ref, api] = usePlane(() => ({
        type: "Static",
        material: 'ground',
        position: [0, 0, 0],
        args: [1000, 1000],
        rotation: [-Math.PI / 2, 0, 0],
    }))

    const { repeat, envmapIntensity } = useControls({
        repeat: {
            value: 500,
            step: 10,
        },
        envmapIntensity: {
            value: 5,
            step: 0.5,
            max: 20,
            min: 0,
        },
    });

    return (
        <group ref={ref as RefObject<Group>} name="Ground">
            <mesh
                position={[0, 0, -0.03]}>
                <mesh
                    receiveShadow
                    castShadow
                // rotation={[-Math.PI / 2, 0, 0] as Triplet}
                >
                    {/* <circleGeometry
                        args={[1000, 1000]}
                    /> */}
                    <meshStandardMaterial
                        // displacementScale={1}
                        envMapIntensity={envmapIntensity} />
                </mesh>
            </mesh>
        </group>
        //</Debug>
    )
}