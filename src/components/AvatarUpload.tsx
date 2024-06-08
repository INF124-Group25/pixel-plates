"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    PixelCrop,
    type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const AvatarUpload = ({
    onFileReady,
}: {
    onFileReady: (file: File) => void;
}) => {
    const [avatarSrc, setAvatarSrc] = useState("");
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop | undefined>({
        unit: "%",
        width: 50,
        height: 50,
        x: 25,
        y: 25,
    });
    const [croppedOutputUrl, setCroppedOutputUrl] = useState<string>("");

    function onSelectAvatarImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setAvatarSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, 1));
    }

    function centerAspectCrop(
        mediaWidth: number,
        mediaHeight: number,
        aspect: number
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 100,
                },
                aspect,
                mediaWidth,
                mediaHeight
            ),
            mediaWidth,
            mediaHeight
        );
    }

    const getCroppedImg = (
        image: HTMLImageElement,
        crop: PixelCrop,
        fileName: string
    ): Promise<string> => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw Error("2d context not working!");
        }
        ctx.beginPath();
        ctx.arc(
            crop.width / 2,
            crop.height / 2,
            crop.width / 2,
            0,
            2 * Math.PI
        );
        ctx.clip();
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                const file = new File([blob], fileName, { type: "image/jpeg" });
                if (croppedOutputUrl) {
                    window.URL.revokeObjectURL(croppedOutputUrl);
                }
                const newUrl = window.URL.createObjectURL(file);
                resolve(newUrl);
            }, "image/jpeg");
        });
    };

    const makeClientCrop = async (crop: PixelCrop) => {
        if (imgRef && imgRef.current && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imgRef.current,
                crop,
                "avatar.jpeg"
            );
            setCroppedOutputUrl(croppedImageUrl);
            console.log('croppedImageUrl:', croppedImageUrl);//TESTING
        }
    };

    const handleFileReady = async () => {
        try {
            if (croppedOutputUrl.length > 0) {
                const response = await fetch(croppedOutputUrl);
                const data = await response.blob();
                const metadata = { type: data.type };
                const file = new File([data], "filename", metadata);
                onFileReady(file);
                setAvatarSrc("");
                // setCroppedOutputUrl("");
            }
        } catch (error) {
            console.error(
                "Avatar is not converting to multipart correctly",
                error
            );
        }
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                name="avatar"
                id="avatar"
                placeholder="Upload Profile Picture"
                onChange={onSelectAvatarImage}
            />
            <br />
            <br />
            <div>
                {!!avatarSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(crop) => makeClientCrop(crop)}
                        aspect={1}
                        // minWidth={400}
                        minHeight={100}
                        circularCrop
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={avatarSrc}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}
            </div>
            <div style={{ display: "flex" }}>
                {croppedOutputUrl && (
                    <>
                        <img
                            src={croppedOutputUrl}
                            style={{ width: "50%", marginInline: "auto" }}
                            alt="avatar output"
                        />
                        <button
                            type="button"
                            onClick={handleFileReady}
                            style={{ width: "9rem" }}
                        >
                            Confirm Picture
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default AvatarUpload;
