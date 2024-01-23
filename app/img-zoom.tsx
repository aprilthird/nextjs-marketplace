"use client";

import Image from "next/image";
import React from "react";
import ReactImageMagnify from "react-image-magnify";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

export default function ImgZoom() {
  return (
    <React.Fragment>
      {/* <Image
        src="/assets/images/banner_1.jpg"
        alt="test"
        width={500}
        height={500}
      /> */}
      <InnerImageZoom
        src="/_next/image?url=%2Fassets%2Fimages%2Fbanner_1.jpg&w=640&q=75"
        zoomSrc="/assets/images/banner_1.jpg"
        width={2500}
        height={800}
        hasSpacer={true}
        zoomType="hover"
        zoomPreload={true}
        fullscreenOnMobile={true}
      />
      {/* <PinchZoomPanImage src="/assets/images/banner_1.jpg" animate={true} /> */}
      {/* <div style={{ width: "500px", height: "500px" }}>
        <PinchZoomPanImage src="http://picsum.photos/750/750" animate={true} />
      </div> */}
      {/* <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: "/assets/images/banner_1.jpg",
          },
          largeImage: {
            src: "/assets/images/banner_1.jpg",
            width: 1200,
            height: 1800,
          },
        }}
      /> */}
    </React.Fragment>
  );
}
