import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

interface SwiperProps {
  path: string;
}

interface Pro {
  images: SwiperProps[];
}

const SwiperS = ({ images }: Pro) => {
  const shuffle = (array: SwiperProps[]): SwiperProps[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const data = shuffle(images);

  return (
    <div className="swiper-container">
      {data.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {data.map((slide) => (
            <SwiperSlide key={slide.path} className="swiper-slide">
              <img
                src={slide.path}
                alt="slide image"
                className="swiper_image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default SwiperS;
