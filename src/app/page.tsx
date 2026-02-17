"use client";

import styles from "./page.module.css";
import Gallery from "@/components/Gallery/index";
import Lenis from 'lenis';
import React, {useEffect, useRef } from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import Des from "@/components/Des/index";

interface Project {
    name: string;
    handle: string;
}

const projects: Project[] = [
    {
        name: "Black and white",
        handle: "black_n_white"
    },
    {
        name: "Motion",
        handle: "motion"
    },
    {
        name: "Nature",
        handle: "nature"
    },
    {
        name: "Vintage",
        handle: "Vintage"
    }
];

export default function Home() {

    const xRef = useRef(0);
    const yRef = useRef(0);
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    const mousePosition = { x: xRef, y: yRef };


    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useGSAP(() => {
        xTo.current = gsap.quickTo(mousePosition.x, "current", {
            duration: 0.8,
            ease: "power3"
        });

        yTo.current = gsap.quickTo(mousePosition.y, "current", {
            duration: 0.8,
            ease: "power3"
        })
    }, []);

    const mouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;

        const targetX = clientX - (window.innerWidth / 2 * 0.25);
        const targetY = clientY - (window.innerHeight / 2 * 0.30);

        if (xTo.current) xTo.current(targetX);
        if (yTo.current) yTo.current(targetY);
    }

    return (
        <main onMouseMove={mouseMove} className={styles.main}>
            {
                projects.map(({ handle }, i) => {
                    return (
                        <Gallery
                            mousePosition={mousePosition}
                            handle={handle}
                            key={i}
                        />
                    );
                })
            }
            <Des mousePosition={mousePosition} projects={projects} />
        </main>
    )
}