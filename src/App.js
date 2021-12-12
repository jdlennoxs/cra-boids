import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React, { useMemo, useRef } from "react";
import { ConeGeometry, EdgesGeometry, Matrix4, Vector3 } from "three";
import "./App.css";

// function Flock({ count }) {
//   const mesh = useRef();
//   const tempColor = new Color();
//   const dummy = useMemo(() => new Object3D(), []);

//   const colors = new Array(count)
//     .fill()
//     .map(() => niceColors[17][Math.floor(Math.random() * 5)]);
//   const colorArray = useMemo(
//     () =>
//       Float32Array.from(
//         new Array(count)
//           .fill()
//           .flatMap((_, i) => tempColor.set(colors[i]).toArray())
//       ),
//     []
//   );

//   let counter = 0;

//   let lineArray = Array.from(
//     new Array(count),
//     () =>
//       new Line(
//         new BufferGeometry().setFromPoints([new Vector3(), new Vector3()])
//       )
//   );

//   const makeWall = (x0, x1, y0, y1, z0, z1) => {
//     const points = [];
//     const planeLength = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(z1 - z0, 2));
//     const numPoints = planeLength / 20;
//     const planeHeight = y1 - y0;
//     const numLayers = planeHeight / 20;
//     const deltaX = (x1 - x0) / numPoints;
//     const deltaY = planeHeight / numLayers;
//     const deltaZ = (z1 - z0) / numPoints;
//     for (let i = 0; i <= numLayers; i++) {
//       for (let j = 0; j <= numPoints; j++) {
//         points.push(
//           new Vector3(x0 + deltaX * j, y0 + deltaY * i, z0 + deltaZ * j)
//         );
//       }
//     }
//     return points;
//   };

//   const makePlane = (x0, x1, y, z0, z1) => {
//     const points = [];
//     const planeLength = x1 - x0;
//     const numPoints = planeLength / 20;
//     const planeHeight = z1 - z0;
//     const numLayers = planeHeight / 20;
//     const deltaX = (x1 - x0) / numPoints;
//     const deltaZ = (z1 - z0) / numPoints;
//     for (let i = 0; i <= numLayers; i++) {
//       for (let j = 0; j <= numPoints; j++) {
//         points.push(new Vector3(x0 + deltaX * j, y, z0 + deltaZ * i));
//       }
//     }
//     return points;
//   };

//   const obstacles = []
//     .concat(makeWall(-200, -200, -100, 100, -200, 200))
//     .concat(makeWall(200, 200, -100, 100, -200, 200))
//     .concat(makeWall(-200, 200, -100, 100, -200, -200))
//     .concat(makeWall(-200, 200, -100, 100, 200, 200))
//     .concat(makePlane(-100, 100, -100, -100, 100))
//     .concat(makePlane(-100, 100, 100, -100, 100));
//   // .concat(this.makeWall(-350, 350, -150, 150, -350, -350))
//   // .concat(this.makeWall(-350, 350, -150, 150, 350, 350))
//   // .concat(makeWall(-100, -0, -40, 40, 0, 100));

//   const boids = useMemo(() => {
//     const temp = [];
//     for (let i = 0; i < count; i++) {
//       const velocity = new Vector3((Math.random() + 1) * 2, -2, Math.random());
//       const position = new Vector3(
//         -80 + i * 1.2,
//         -80 + Math.random(),
//         Math.random() * 2 + i
//       );
//       const mass = 1 + Math.random() * 2;
//       const visibility = 60 + 10 * mass;
//       const speed = 3 - mass;
//       temp.push({ velocity, position, mass, visibility, speed });
//     }
//     return temp;
//   }, [count]);

//   useFrame((state) => {
//     counter++;
//     boids.forEach((boid, i) => {
//       boid.neighbours = [];
//       // Find neighbours
//       boids.forEach((neighbour, j) => {
//         if (i !== j) {
//           var squareDistance =
//             Math.pow(neighbour.position.x - boid.position.x, 2) +
//             Math.pow(neighbour.position.y - boid.position.y, 2) +
//             Math.pow(neighbour.position.z - boid.position.z, 2);

//           if (squareDistance < Math.pow(boid.visibility, 2)) {
//             boid.neighbours.push(j);
//           }
//         }
//       });

//       // if (i === 0) {
//       // boid.neighbours.forEach((neighbour, z) => {
//       //   if (lineArray[z]) {
//       //     lineArray[z].geometry = new BufferGeometry().setFromPoints([
//       //       boid.position,
//       //       boids[neighbour].position,
//       //     ]);
//       //   }
//       //   lineArray.push(
//       //     new Line(
//       //       new BufferGeometry().setFromPoints([
//       //         boid.position,
//       //         boids[neighbour].position,
//       //       ])
//       //     )
//       //   );
//       //   lineArray = lineArray.slice(0, boid.neighbours.length);
//       // });
//       //   lineArray.forEach((line, z) => {
//       //     if (boid.neighbours.includes(z)) {
//       //       lineArray[z].geometry = new BufferGeometry().setFromPoints([
//       //         boid.position,
//       //         boids[z].position,
//       //       ]);
//       //     } else {
//       //       lineArray[z].geometry = new BufferGeometry().setFromPoints([
//       //         new Vector3(),
//       //         new Vector3(),
//       //       ]);
//       //     }
//       //   });
//       // }

//       if (i === 0 && (counter === 100 || counter === 80)) {
//         console.log(boid.neighbours);
//         console.log(boid.velocity);
//       }

//       const force = new Vector3();
//       const cohesion = new Vector3();
//       const alignment = new Vector3();
//       const separation = new Vector3();

//       if (boid.neighbours.length) {
//         boid.neighbours.forEach((neighbourIndex) => {
//           cohesion.add(boids[neighbourIndex].position);
//           alignment.add(boids[neighbourIndex].velocity);

//           const distance = boid.position.distanceTo(
//             boids[neighbourIndex].position
//           );

//           if (distance <= 30) {
//             const offset = new Vector3()
//               .add(boid.position)
//               .sub(boids[neighbourIndex].position);
//             separation.add(offset.divideScalar(distance + 0.01));
//           }
//         });

//         force.add(
//           separation.divideScalar(boid.neighbours.length).multiplyScalar(20)
//           // .clampLength(0, 10 / boid.mass)
//         );
//         force.add(
//           cohesion
//             .divideScalar(boid.neighbours.length)
//             .sub(boid.position)
//             .multiplyScalar(0.1)
//           // .clampLength(0, 0.5 / boid.mass)
//         );
//         force.add(
//           alignment
//             .divideScalar(boid.neighbours.length)
//             .sub(boid.velocity)
//             .multiplyScalar(0.5)
//           // .clampLength(0, 0.5 / boid.mass)
//         );
//       }

//       obstacles.forEach((obstacle) => {
//         let distance = boid.position.distanceTo(obstacle);
//         if (distance < boid.visibility) {
//           if (i === 0) {
//             console.log(distance);
//           }
//           const offset = new Vector3().add(boid.position).sub(obstacle);
//           force.add(offset.divideScalar(distance).multiplyScalar(0.1));
//         }
//       });

//       boid.velocity.add(force.divideScalar(boid.mass));
//       boid.velocity.clampLength(boid.speed - 1, boid.speed + 1);

//       boid.position.add(boid.velocity);
//       if (Math.abs(boid.position.z) > 299) {
//         boid.position.z = -boid.position.z;
//       }
//       if (Math.abs(boid.position.y) > 99) {
//         boid.position.y = -boid.position.y;
//       }
//       if (Math.abs(boid.position.x) > 299) {
//         boid.position.x = -boid.position.x;
//       }

//       const { x, y, z } = boid.position;
//       dummy.position.set(x, y, z);

//       dummy.lookAt(new Vector3().addVectors(boid.velocity, boid.position));

//       dummy.translateY(-1);
//       dummy.rotateX(Math.PI / 2);
//       dummy.scale.set(boid.mass / 2, boid.mass / 2, boid.mass / 2);
//       dummy.updateMatrix();

//       mesh.current.setMatrixAt(i, dummy.matrix);
//     });
//     mesh.current.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <>
//       <instancedMesh ref={mesh} args={[null, null, count]}>
//         <coneBufferGeometry attach="geometry" args={[3, 8, 3]}>
//           <instancedBufferAttribute
//             attachObject={["attributes", "color", "ma"]}
//             args={[colorArray, 3]}
//           />
//         </coneBufferGeometry>
//         <meshStandardMaterial attach="material" vertexColors={VertexColors} />
//       </instancedMesh>
//       {/* {lineArray.map((line) => (
//         <primitive object={line} />
//       ))} */}
//     </>
//   );
// }

const Flock = ({ count }) => {
  const group = useRef();

  return (
    <group ref={group} name="flock" dispose={null}>
      {[...Array(count)].map((value, index) => {
        const mass = 1 + Math.random();
        const visibility = 50 + 10 * mass;
        const velocity = new Vector3(
          1,
          Math.random() - 0.5,
          (Math.random() - 0.5) * 2
        );
        const speed = 1 * mass;
        return (
          <Boid
            index={index}
            position={[-200, Math.random() * 30, 100]}
            userData={{
              mass,
              visibility,
              velocity,
              speed,
            }}
          />
        );
      })}
    </group>
  );
};

function Boid(props) {
  const edge = useMemo(
    () => new EdgesGeometry(new ConeGeometry(3, 8, 3), 0),
    []
  );
  const ref = useRef();
  const { index } = props;

  useFrame(() => {
    const { visibility, velocity, mass, speed } = ref.current.userData;
    const { position } = ref.current;
    const flock = ref.current.parent.children;
    const neighbours = [];

    // Find neighbours
    flock.forEach((boid, i) => {
      if (i !== index) {
        var squareDistance =
          Math.pow(boid.position.x - position.x, 2) +
          Math.pow(boid.position.y - position.y, 2) +
          Math.pow(boid.position.z - position.z, 2);

        if (squareDistance < Math.pow(visibility, 2)) {
          neighbours.push(i);
        }
      }
    });

    const force = new Vector3();
    const cohesion = new Vector3();
    const alignment = new Vector3();
    const separation = new Vector3();

    if (neighbours.length) {
      neighbours.forEach((neighbourIndex) => {
        cohesion.add(flock[neighbourIndex].position);
        alignment.add(flock[neighbourIndex].userData.velocity);

        const distance = position.distanceTo(flock[neighbourIndex].position);

        if (distance <= 40) {
          const offset = new Vector3()
            .add(position)
            .sub(flock[neighbourIndex].position);
          separation.add(offset.divideScalar(Math.max(1, distance / 5)));
        }
      });

      force.add(separation.divideScalar(neighbours.length).clampLength(0, 1));
      force.add(
        cohesion
          .divideScalar(neighbours.length)
          .sub(position)
          .clampLength(0, 0.2)
      );
      force.add(
        alignment
          .divideScalar(neighbours.length)
          .sub(velocity)
          .clampLength(0, 0.1)
      );
    }

    if (Math.abs(velocity.y) > 0) {
      force.add(new Vector3(0, -velocity.y, 0).clampLength(0, 0.05));
    }

    velocity.add(force.divideScalar(mass).clampLength(0, 1 / mass));
    velocity.clampLength(0.2, speed + 1);

    if (Math.abs(ref.current.position.z) > 200) {
      ref.current.position.z = -ref.current.position.z;
    }
    if (Math.abs(ref.current.position.y) > 100) {
      ref.current.position.y = -ref.current.position.y;
    }
    if (Math.abs(ref.current.position.x) > 200) {
      ref.current.position.x = -ref.current.position.x;
    }
    ref.current.position.x += velocity.x;
    ref.current.position.y += velocity.y;
    ref.current.position.z += velocity.z;
    ref.current.lookAt(
      new Vector3().addVectors(ref.current.position, velocity)
    );
  });

  return (
    <mesh {...props} ref={ref}>
      <lineSegments
        args={[edge]}
        matrixAutoUpdate={false}
        matrix={new Matrix4()
          .makeTranslation(0, -1, 0)
          .makeRotationX(Math.PI / 2)}
        scale={props.mass}
      >
        <lineBasicMaterial color="black" />
      </lineSegments>
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <Canvas
        style={{ height: "700px" }}
        camera={{
          fov: 75,
          position: [-100, 30, 100],
          rotateY: -Math.PI / 4,
          rotateZ: -Math.PI / 16,
          rotateX: -Math.PI / 16,
          type: "PerspectiveCamera",
        }}
      >
        <fog attach="fog" args={["white", 0, 400]} />
        <ambientLight />
        <pointLight position={[0, 100, 0]} intensity={2} />
        <Flock count={100} />
        <EffectComposer multisampling={0} />
      </Canvas>
    </div>
  );
}

export default App;
