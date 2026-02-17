"use client";

import styles from './style.module.scss';
import Image from 'next/image';
import { useRef, RefObject} from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

interface GalleryProps {
    mousePosition: {
        x: RefObject<number>;
        y: RefObject<number>;
    };
    handle: string;
}

export default function Gallery({ mousePosition, handle}: GalleryProps) {
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
    }, []);
    return (
        <section className={styles.gallery}>
            <div className={styles.imageContainer}>
                <Image
                    src={`/images/${handle}/background.jpg`}
                    alt="image"
                    fill
                />
            </div>
            <div className={styles.vignetter} ref={vignetteRef}>
                <Image
                    src={`/images/${handle}/1.jpg`}
                    alt="vignette image"
                    fill
                    />
            </div>
        </section>
    )
}