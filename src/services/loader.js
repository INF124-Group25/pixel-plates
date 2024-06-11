'use client'

// strech goal - finish lamda function for image optimizaiton
// Docs: https://aws.amazon.com/developer/application-security-performance/articles/image-optimization
export default function cloudfrontLoader({ src, width, quality }) {
    const url = new URL(`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${src}`);
    url.searchParams.set('format', 'auto');
    url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', (quality || 75).toString());
    // console.log('cloudfrontLoader', url.href);//TESTING
    return url.href;
}