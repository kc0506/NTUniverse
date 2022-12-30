import { Center, Decal, Float, Html, Sparkles, Stage, Text, Text3D, Trail, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import ModelFBX from "../../Components/THREE/models/ModelFBX";
import HtmlBtn from "../../Components/THREE/testing/HtmlBtn";
import Map from "../../Components/THREE/testing/Map";
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Material, RepeatWrapping, Texture } from "three";
import { useControls } from "leva";
import { animated, config, easings, useSpring } from "@react-spring/three";
import { Modal } from "antd";

export default function TestContainer() {

    const sizes = useMemo(() => {
        return new Float32Array(Array.from({ length: 100 }, () => Math.random() * 15))
    }, []);

    const { repeat } = useControls({
        repeat: 5,
    })

    const texture = useTexture('./！.png', (texture: Texture) => {
        texture.repeat.set(repeat, repeat);
        texture.offset.set(0, 0);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
    });

    const spring = useSpring({
        from: {
            position: [0, 3.5, 0],
            opacity: 1,
        },
        to: [{
            position: [0, 5, 0],
            opacity: 0,
        }],
        config: (key) => {
            switch (key) {
                case 'position':
                    return {
                        damping: 20,
                        mass: 0.5,
                        tension: 200,
                        friction: 3,
                        velocity: 0,
                        easing: easings.easeInCubic,
                    }
            }
            return {
                duration: 2000,
            };
        },
        // delay: 0,

        loop: true,
    });

    const C = animated(Center);
    console.log(C);

    return (
        <>
            {/* <Float
                // position={[0, 0, 0]}
                // rotation={[Math.PI / 3.5, 0, 0]}
                rotationIntensity={1.5}
                floatIntensity={1}
                floatingRange={[0, 1]}
                speed={5}
            > */}
            {/*@ts-ignore*/}
            <C {...spring}>
                <Text3D font={'/fonts/burnfont-1.2.json'} bevelEnabled bevelSize={0.05}>
                    {/* <meshNormalMaterial /> */}
                    <animated.meshStandardMaterial {...spring} transparent color={"#e0e272"} roughness={1} />
                    ！
                </Text3D>
            </C>
            {/* </Float> */}

            <Html>
                <Modal
                    open={true}
                    bodyStyle={{ backgroundColor: 'red', backdropFilter: 'blur' }} />
            </Html>

            <Sparkles
                scale={3.5}
                noise={1}
                color="#ddc180"
                size={sizes}
                count={75}
                position={[0, 1.5, 0]}
                opacity={0.3}
            />

            <mesh scale={0.01}>
                <ModelFBX filePath="./sign1.fbx" />
            </mesh>
        </>
    )
}