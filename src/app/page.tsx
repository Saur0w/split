"use client";

import styles from "./page.module.css";
import Gallery from "@/components/gallery/index";
import Lenis from 'lenis';
import React, { useEffect, useState } from "react";

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

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

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

    const mouseMove = (e: React.MouseEvent) => {

    }

    return (
        <main onMouseMove={mouseMove} className={styles.main}>
            {
                projects.map(({handle}, i) => {
                    return <Gallery handle={handle} key={i}/>
                })
            }
        </main>
    )
}