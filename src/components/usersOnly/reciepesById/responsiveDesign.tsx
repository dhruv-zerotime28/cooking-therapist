import React from 'react'
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';


interface IMobileProps{
    images : string[],
    tags : string[],
    categories :string[]
}
export const ImagesAndInforMobile = (data:IMobileProps) => {
  return (
    <div className="lg:hidden mb-6">
    {/* Image Carousel */}
    <div className="mb-4">
      <Carousel>
        <CarouselContent>
          {data.images.map((image, index) => {
            return (
              <CarouselItem
                key={index}
                className="relative w-full h-[500px]"
              >
                <Image
                  src={image}
                  alt="img"
                  fill
                  className="rounded-lg object-cover"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>

    {/* Tags and Categories */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary mb-2">
        Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {data.categories.map((category, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
          >
            {category}
          </span>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
  )
}

export const ImagesAndInfoWindow = (data:IMobileProps) => {
    return (
        <div className="lg:sticky lg:top-4 lg:w-1/3">
        {/* Image Carousel (Hidden on Small Screens) */}
        <div className="mb-6 hidden lg:block">
          <Carousel>
            <CarouselContent>
              {data.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="relative w-full h-[600px]"
                >
                  <Image
                    src={image}
                    alt="img"
                    fill
                    className="rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* Categories and Tags (Hidden on Small Screens) */}
        <div className="mb-6 hidden lg:block">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6 hidden lg:block">
          <h3 className="text-lg font-semibold text-primary mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
