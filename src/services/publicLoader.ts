'use client'
import { ImageLoader } from 'next/image';

const publicLoader:ImageLoader = ({ src, width, quality }) => {
    return `${src}`;
}
export default publicLoader;