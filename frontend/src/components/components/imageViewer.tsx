"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import Image from "next/image"

interface ImageViewerProps {
  images: string[]
  initialIndex: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ImageViewer({ images, initialIndex, open, onOpenChange }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Reset current index when the dialog opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
    }
  }, [open, initialIndex])

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowLeft":
          setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
          break
        case "ArrowRight":
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          break
        case "Escape":
          onOpenChange(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, images.length, onOpenChange])

  if (!open || images.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="sr-only hidden">Image Viewer</DialogTitle>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Main image */}
          <div className="relative max-w-full max-h-[90vh] flex items-center justify-center">
            <Image
              width={800}
              height={800}
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Full size image ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-md"
            />
          </div>

          {/* Navigation buttons - only show if more than one image */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
