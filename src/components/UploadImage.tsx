'use client'

import { uploadPicture } from '@/services/api'
import { useState, useEffect } from 'react'

export function UploadImage({ onUpload }: { onUpload: (location: string) => void }) {
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

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      // this will make it immediately upload to s3
      const res = await uploadPicture(file, true, "d46f491a-6630-4091-927e-1d14a8148e8d");
      onUpload(res.location)

      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100px' }} />}
      <button onClick={onSubmit}> Upload</button>
    </>
  )
}