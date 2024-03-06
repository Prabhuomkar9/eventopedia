import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Engine,
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
import { loadFull } from "tsparticles";
// import { loadSlim } from "@tsparticles/slim";
// TODO: compelte anna

const Test2 = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const h = async () => {
      await initParticlesEngine(async (engine: Engine) => {
        // await loadSlim(engine);
        await loadFull(engine);
      }).then(() => {
        setInit(true);
      });
    };
    void h();
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      particles: {
        color: {
          value: "#FF0000",
          animation: {
            enable: true,
            speed: 5,
          },
        },
        move: {
          direction: "none",
          enable: true,
          outModes: "destroy",
          path: {
            clamp: false,
            enable: true,
            delay: {
              value: 0,
            },
            generator: "polygonPathGenerator",
            options: {
              sides: 6,
              turnSteps: 30,
              angle: 30,
            },
          },
          speed: 3,
          trail: {
            fill: {
              color: "#000",
            },
            length: 20,
            enable: true,
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: 0,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 2,
        },
      },
      background: {
        color: "#000",
      },
      fullScreen: {
        zIndex: -1,
      },
      emitters: {
        direction: "none",
        rate: {
          quantity: 1,
          delay: 0.25,
        },
        size: {
          width: 0,
          height: 0,
        },
        position: {
          x: 50,
          y: 50,
        },
      },
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default Test2;
