import { Triplet } from "@react-three/cannon";
import { Trail } from "@react-three/drei";
import { Object3DProps, ReactThreeFiber } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import TestCube from "../testing/TestCube";
import Vehicle from "./Vehicle";

interface ObjectProps extends Object3DProps {
    position?: Triplet,
    rotation?: Triplet,
}

interface BikeProps {
    objectProps?: ObjectProps,
    trail?: boolean,
};

export default function Bike({ objectProps, trail = false }: BikeProps) {

    const ref = useRef<Mesh>(null!);

    return (
        <>
            <Vehicle objectProps={objectProps} ref={ref} />
        </>
    )
}

export type { BikeProps, ObjectProps };