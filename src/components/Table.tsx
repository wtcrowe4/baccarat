import { useRef, RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Table = () => {
    const tableRef = useRef<RefObject<THREE.Mesh>>(null);

    useFrame(() => {
        if (tableRef.current && tableRef.current.current) {
            tableRef.current.current.rotation.y += 0.01;
            tableRef.current.current.rotation.x += 0.005;
            tableRef.current.current.rotation.z += 0.002;
        }
    });

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <mesh ref={tableRef}>
                <boxGeometry args={[5, 1, 3]} />
                <meshStandardMaterial color="green" />
            </mesh>
        </Canvas>
    );
};

export default Table;