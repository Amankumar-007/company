"use client"
import TiltedCard from "./TiltedCard"

const projects = [
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png"
]

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-white rounded-[50px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Explore our portfolio of award-winning digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((imageSrc, index) => (
            <div key={index}>
              <TiltedCard
                imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                altText="Kendrick Lamar - GNX Album Cover"
                captionText="Kendrick Lamar - GNX"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
               
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
