import { Triplet } from "@react-three/cannon";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { createContext, useState } from "react";
import Camera from "../../Components/THREE/scene/Camera";
import Lights from "../../Components/THREE/scene/Lights";
import AppOrbitControls from "../../Components/THREE/scene/OrbitControls";
import Shadow from "../../Components/THREE/scene/Shadow";
import AppSky from "../../Components/THREE/static/Sky";
import { SetStateType } from "../../Utils/type";
import TestContainer from "./TestContainer";
import World from "./World";

interface IContext {
	/**
	 * Bike
	 */
	bikePosition: Triplet,
	setBikePosition: SetStateType<Triplet>,
	bikeControlling: boolean,
	setBikeControlling: SetStateType<Boolean>,

	/**
	 * Helpers
	 */
	helpers: boolean,
	setHelpers: SetStateType<boolean>,

	/**
	 * Controls
	 */
	enableControls: boolean,
	setEnableControls: SetStateType<boolean>,
};

const ThreeContext = createContext<IContext>({
	/**
	 * Bike
	 */
	bikePosition: [0, 0, 1],
	setBikePosition: (r) => { },
	bikeControlling: false,
	setBikeControlling: (x) => { },

	/**
	 * Helpers
	 */
	helpers: false,
	setHelpers: (h) => { },

	/**
	 * Controls
	 */
	enableControls: false,
	setEnableControls: (e) => { },
});

// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 20,
//     rings: 11
// });

export default function AppCanvas() {

	/**
	 * Bike
	 */
	const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
	const [bikeControlling, setBikeControlling] = useState<boolean>(false);
	const [helpers, setHelpers] = useState<boolean>(false);
	const [enableControls, setEnableControls] = useState<boolean>(false);
	return (
		<Canvas
		// shadows
		>
			<Perf position="top-left" />

			<Shadow />
			<Lights />
			{helpers && <>
				<axesHelper args={[10]} />
				<gridHelper />
			</>}

			<AppSky />
			<Environment
			// files={ './env.hdr'}
			// background
			>
				{/* <color args={['#F8EEDC']} attach='background' /> */}
				{/* <color args={['#1dc5a9']} attach='background' /> */}
				{/* <color args={['#ff0000']} attach='background' /> */}
				<color args={['#A2B4C2']} attach='background' />
			</Environment>

			<ThreeContext.Provider value={{
				bikePosition,
				setBikePosition,
				bikeControlling,
				setBikeControlling,
				helpers,
				setHelpers,
				enableControls,
				setEnableControls,
			}}>
				<Camera />
				<AppOrbitControls enabled={enableControls} />

				<World />
				<TestContainer />

			</ThreeContext.Provider>
		</Canvas >
	)
}

export { ThreeContext };