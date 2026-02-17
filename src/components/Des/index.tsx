"use client";

import {useState, useRef, RefObject} from "react";
import styles from "./style.module.scss";
import Image from "next/image";
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
    return (
        <div className={styles.des}>

        </div>
    );
}