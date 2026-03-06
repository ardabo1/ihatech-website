"use client";

import { Canvas } from "@react-three/fiber";
import { PresentationControls, useGLTF, Center } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function ActualUAVModel() {
  // Modelimizi public klasöründeki talon.glb dosyasından çekiyoruz
  const { scene } = useGLTF("/talon.glb");

  // Model yüklendiğinde tüm yüzeylerini neon mavi bir tel kafese (wireframe) çeviriyoruz
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#3b82f6",     // İHATECH Kobalt Mavisi
          wireframe: true,      // İçini boşalt, tel kafes yap
          transparent: true,
          opacity: 0.8,
          emissive: "#1d4ed8",  // Otonom/Siber bir hava katmak için parlama efekti
          emissiveIntensity: 0.4,
        });
      }
    });
  }, [scene]);

  return (
    // Uçağı daha küçük göstermek için scale değeri küçültüldü (0.65)
    <primitive object={scene} scale={0.012} rotation={[Math.PI / 2, 0, 0]} />
  );
}

export default function Hero3DModel() {
    return (
      <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <PresentationControls
            global
            cursor={true}
            snap={true} // İŞTE BÜTÜN SİHİR BURADA! Kendi ayarlarına bırakıyoruz.
            speed={1.5}
            polar={[-0.2, 0.2]}
          >
            <Center>
              <ActualUAVModel />
            </Center>
          </PresentationControls>
        </Canvas>
      </div>
    );
  }