import { Triplet, useBox, useCompoundBody, useHingeConstraint, useLockConstraint, usePointToPointConstraint } from "@react-three/cannon";
import React, { RefObject, useEffect, useRef } from "react";
import { Euler, FrontSide, Mesh, Vector3 } from "three";
import ModelFBX from "../models/ModelFBX";
import { useSpring, animated, config } from '@react-spring/three';
import { ArcadeDirection } from "./Vehicle";
import { Camera, invalidate, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { IControls } from "./hooks/useControls";

interface BikeMeshProps {
	args: Triplet,
	mass: number,
	position?: Triplet,
	rotation?: Triplet,
	// left?: boolean,
	// right?: boolean,
	controls: RefObject<IControls>,
	arcadeDirection: ArcadeDirection,
}

const BikeMesh = React.forwardRef<any, BikeMeshProps>(
	({ args, mass, position, rotation, arcadeDirection, controls }, ref: RefObject<Mesh>) => {
		const [, api] = useBox(() => ({
			mass,
			args,
			position,
			rotation,
			allowSleep: false,
			//onCollide: (e: any) => console.log('bonk', e),
			collisionResponse: true,
		}), ref);

		const delta = -0.125;
		const defaultObjectProps = {
			scale: 0.02,
			position: [0, delta + -args[1] / 2, 0] as Triplet,
			// rotation: [0, Math.PI, 0] as Triplet,
		};


		const { scale, rotation: steerRotation } = useSpring({
			scale: 1,
			rotation: [
				Math.PI * -0.09,
				Math.PI / 4 * (arcadeDirection === 'left' ? 1
					: arcadeDirection === 'right' ? -1
						: 0),
				0,
			],
			config: config.wobbly,
		})

		const { x, y, z, Crotation } = useControls({
			x: {
				value: 5,
				step: .5,
			},
			y: {
				value: 5,
				step: .5,
			},
			z: {
				value: 5,
				step: .5,
			},
			Crotation: {
				value: {
					x: 0,
					y: 0,
					z: 0,
				},
				step: 0.01,
			}
		});

		const rSub = useRef<Triplet>([0, 0, 0]);
		useEffect(() => {
			return api.rotation.subscribe((r: Triplet) => {
				rSub.current = r;
			});
		}, [api]);


		const [frontWheel, frontWheelApi] = useCompoundBody(() => ({
			mass: 1,
			type: 'Kinematic',
			material: 'wheel',
			collisionFilterGroup: 0,
			shapes: [{
				type: 'Cylinder',
				rotation: [0, 0, -Math.PI / 2],
				args: [0.66, 0.66, 0.35, 16],
			}],
		}));

		const cam = useRef();
		const { camera } = useThree();
		useEffect(() => {
			console.log(camera);
			return api.position.subscribe(r => {
				camera.lookAt(...r);
			})
		}, [api]);

		useEffect(() => {
			return api.velocity.subscribe(v => {
				const sign = controls.current.forward ? -1 : 1;
				frontWheelApi.angularVelocity.set(
					Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) * sign / 0.66, 0, 0
				);
			})
		}, [api]);

		return (
			//@ts-ignore
			<mesh ref={ref} api={api} name="Chassis">

				<ModelFBX filePath="./resources/models/bike/body.fbx"
					objectProps={defaultObjectProps}
				/>
				<animated.group
					position={[0, 0.48, 1.02,]}
					rotation={steerRotation as any}
				>
					<ModelFBX
						filePath="./resources/models/bike/arcadeNew.fbx"
						objectProps={{
							scale: 0.02,
							position: [0, 0, 0],
							// rotation: new Euler(0, Math.PI / 2, 0, "ZYX"),
						}} />
				</animated.group>

				{/* @ts-ignore */}
				<animated.mesh
					rotation={steerRotation as any}
					position={[0, -0.008 - 0.24, 1.23]}
				>
					<animated.group ref={frontWheel as any}>
						<mesh>
							<ModelFBX filePath="./resources/models/bike/frontWheel.fbx"
								objectProps={{
									scale: 0.02,
									rotation: [0, 0, 0],
								}} />
						</mesh>
					</animated.group>
				</animated.mesh>

				{/* <PerspectiveCamera
					ref={cam}
					makeDefault
					position={[3, 5, 0]}
				// rotation={[0, 0, Math.PI / 2]}
				// rotation={[Crotation.x, Crotation.y, Crotation.z]}
				/> */}
			</mesh>
		)
	});

export default BikeMesh;