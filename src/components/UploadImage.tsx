'use client'

import { uploadPicture } from '@/services/api'
import { useState, useEffect } from 'react'

interface UploadImageProps {
  onUpload: (location: string) => void;
  onFileChange: (file: File | undefined) => void;
}


// export function UploadImage({ onUpload, onFileChange }: UploadImageProps) {
export function UploadImage({ handleFileChange  }: {handleFileChange:(file:File) => void }) {

  const [file, setFile] = useState<File>()
  const [previewUrl, setPreviewUrl] = useState<string>()

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files ||  !e.target.files[0]){
      console.error('no file being uploaded');
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    handleFileChange(file);
  };
  
  return (
    <>
      <input
        type="file"
        name="file"
        // onChange={(e) => setFile(e.target.files?.[0])}
        onChange={handleChange}
      />
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100px' }} />}
    </>
  )
}

