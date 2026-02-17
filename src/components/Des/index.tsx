"use client";

import {useState, useRef, RefObject} from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Project {
    name: string;
    handle: string;
}

interface DesProps {
    mousePosition: {
        x: RefObject<number>;
        y: RefObject<number>;
    };
    projects: Project[];
}
export default function Des({ mousePosition, projects }: DesProps) {
    const [index, setIndex] = useState(0);
    const vignetteRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const updatePosition = () => {
            if (!vignetteRef.current) return;

            const currentX = mousePosition.x.current;
            const currentY = mousePosition.y.current;

            gsap.set(vignetteRef.current, {x: currentX, y: currentY});
        };

        gsap.ticker.add(updatePosition);

        return () => {
            gsap.ticker.remove(updatePosition);
        };
    }, [])
    return (
        <div className={styles.des}>
            <div className={styles.desContainer}>
                {projects.map(({ name }, i) => {
                    return (
                        <p onMouseOver={() => { setIndex(i) }}
                           key={`p${i}`}
                           >
                            {name}
                        </p>
                    );
                })}
            </div>

            <div ref={vignetteRef} className={styles.vignette}>
                <Image src={`/images/${projects[index].handle}/small.jpg`}
                       alt="project image"
                       fill
                       style={{ objectFit: 'cover' }}
                       />
            </div>
        </div>
    );
}