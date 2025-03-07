import React, { useState, useEffect } from "react";

const images = [
  "/assets/partner_image_slider/fpt.png",
  "/assets/partner_image_slider/samsung.png",
  "/assets/partner_image_slider/alibaba.png",
  "/assets/partner_image_slider/usol.png",
  "/assets/partner_image_slider/lachong.png",
  "/assets/partner_image_slider/vncert.png",
  "/assets/partner_image_slider/meisei.png",
  "/assets/partner_image_slider/gem.png",
];

const visibleImages = 5;
const imageWidth = 120;

function PartnerImageSlider() {
  const [displayImages, setDisplayImages] = useState([...images.slice(0, visibleImages + 1)]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true); // Kích hoạt hiệu ứng trượt

      setTimeout(() => {
        setDisplayImages((prevImages) => {
          const nextIndex = (images.indexOf(prevImages[prevImages.length - 1]) + 1) % images.length;
          return [...prevImages.slice(1), images[nextIndex]]; // Loại ảnh đầu, thêm ảnh mới vào cuối
        });

        setIsTransitioning(false); // Reset hiệu ứng ngay lập tức
      }, 500); // Animation time = 500ms
    }, 5000); // Chuyển mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[1300px] h-[80px] mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: isTransitioning ? `translateX(-${imageWidth}px)` : "translateX(0)",
          width: `${(visibleImages + 1) * imageWidth}px`,
        }}
      >
        {displayImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-[250px] h-[70px] mx-13 object-contain"
          />
        ))}
      </div>
    </div>
  );
}

export default PartnerImageSlider;
