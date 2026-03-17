"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Html } from "@react-three/drei";
import { useEffect, Suspense } from "react";
import * as THREE from "three";

// Model yüklenirken gösterilecek şık bir yer tutucu
function Loader() {
  return (
    <Html center>
      <div className="text-blue-600 font-semibold animate-pulse whitespace-nowrap">
        İHA Yükleniyor...
      </div>
    </Html>
  );
}

function ActualUAVModel() {
  // Modelimizi public klasöründeki talon.glb dosyasından çekiyoruz
  // Not: Bu hook mutlaka bir <Suspense> boundary içinde olmalıdır!
  const { scene } = useGLTF("/talon.glb");

  // Model yüklendiğinde tüm yüzeylerini neon mavi bir tel kafese (wireframe) çeviriyoruz
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Otonom/Siber bir hava katmak için özel materyal
        child.material = new THREE.MeshStandardMaterial({
          color: "#3b82f6",     // İHATECH Kobalt Mavisi
          wireframe: true,      // İçini boşalt, tel kafes yap
          transparent: true,
          opacity: 0.8,
          emissive: "#1d4ed8",  
          emissiveIntensity: 0.4,
        });
      }
    });
  }, [scene]);

  return (
    // Uçağı daha küçük göstermek için scale değeri küçültüldü (0.012)
    <primitive object={scene} scale={0.012} rotation={[Math.PI / 2, 0, 0]} />
  );
}

export default function Hero3DModel() {
  return (
    // 'touch-none' mobil cihazlarda dokunmatik etkileşimleri Canvas'a yönlendirmek için önemlidir
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none relative z-10">
      <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
        {/* Ortam aydınlatması */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        {/* Suspense: ActualUAVModel içindeki useGLTF asenkron çalıştığı için 
          model yüklenene kadar fallback (Loader) gösterilir.
        */}
        <Suspense fallback={<Loader />}>
          <Center>
            <ActualUAVModel />
          </Center>
        </Suspense>

        {/* Fare etkileşimleri */}
        <OrbitControls
          enablePan={false} // Sağa sola kaydırmayı kapat
          enableZoom={false} // Sayfa scrollunu bozmaması için zoom'u kapat
          rotateSpeed={0.8} // Dönüş hızını ayarla
          autoRotate={true} // Opsiyonel: Kendi kendine hafifçe dönsün istersen true yap
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}

// Modelin tarayıcı tarafından önceden yüklenmesini (preload) sağlar, performansı artırır.
useGLTF.preload("/talon.glb");