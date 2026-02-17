"use client";

import styles from './style.module.scss';
import Image from 'next/image';

interface GalleryProps {
    handle: string;
}

export default function Gallery({ handle}: GalleryProps) {
    return (
        <section className={styles.gallery}>
            <div className={styles.imageContainer}>
                <Image
                    src={`/images/${handle}/1.jpg`}
                    alt="image"
                    fill
                />
            </div>
        </section>
    )
}