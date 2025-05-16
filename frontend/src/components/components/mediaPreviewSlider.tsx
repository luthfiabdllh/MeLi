"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

interface MediaPreviewSliderProps {
  mediaPreviews: string[]
  mediaFiles: File[]
  onRemove: (index: number) => void
}

export default function MediaPreviewSlider({ mediaPreviews, mediaFiles, onRemove }: MediaPreviewSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (mediaPreviews.length === 0) return null

  const isImage = (file: File) => file.type.startsWith("image/")
  const isVideo = (file: File) => file.type.startsWith("video/")

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaPreviews.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaPreviews.length) % mediaPreviews.length)
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-slate-50">
      <div className="aspect-video relative">
        {isImage(mediaFiles[currentIndex]) ? (
          <Image
            width={800}
            height={800}
            src={mediaPreviews[currentIndex] || "/placeholder.svg"}
            alt={`Preview ${currentIndex}`}
            className="w-full h-full object-contain"
          />
        ) : isVideo(mediaFiles[currentIndex]) ? (
          <video src={mediaPreviews[currentIndex]} className="w-full h-full object-contain" controls />
        ) : null}

        {/* Remove button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full"
          onClick={() => onRemove(currentIndex)}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Navigation buttons - only show if more than one media */}
        {mediaPreviews.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={(e) => {
                e.preventDefault()
                goToPrevious()
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={(e) => {
                e.preventDefault()
                goToNext()
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Indicators */}
      {mediaPreviews.length > 1 && (
        <div className="flex justify-center gap-1 p-2">
          {mediaPreviews.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-4 bg-blue-500" : "w-2 bg-slate-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {mediaPreviews.length > 1 && (
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1}/{mediaPreviews.length}
        </div>
      )}
    </div>
  )
}
