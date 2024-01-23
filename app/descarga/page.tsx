"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Descarga() {
  const getOS = () => {
    // var userAgent = window.navigator.userAgent,
    //   platform =
    //     window.navigator?.userAgentData?.platform || window.navigator.platform,
    //   macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    //   windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    //   iosPlatforms = ["iPhone", "iPad", "iPod"],
    //   os = null;

    var userAgent = window.navigator.userAgent;
    var platform = window.navigator.platform;
    // var platform =
    // (window.navigator as any).userAgentData?.platform ||
    // window.navigator.platform;
    var macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
    var windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
    var iosPlatforms = ["iPhone", "iPad", "iPod"];
    var os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      window.location.href = "https://apps.apple.com/pe/app/qury/id1574598568";
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      window.location.href = "https://apps.apple.com/pe/app/qury/id1574598568";
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.qury";
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.qury";
      os = "Android";
      // } else if (/Linux/.test(platform)) {
      //    window.location.href =
      //     "https://www.yourURL.com", "_blank"
      //   os = 'Linux';
    } else {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.qury";
    }
    console.log(os);
  };

  useEffect(() => {
    getOS();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="mx-auto"
    >
      <div className="mt-5 mb-4">
        <Image
          style={{
            objectFit: "fill",
            width: "auto",
            height: 40,
            marginTop: 10,
          }}
          src="/assets/images/logo-white-1x.png"
          alt="App de Qury"
          height="40"
          width="120"
        />
      </div>
      <div className="text-lg font-bold">Descarga la app de Qury</div>
      <div className="flex space-x-2">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://apps.apple.com/pe/app/qury/id1574598568"
          className="flex mt-3 w-48 h-14 bg-black text-white rounded-xl items-center justify-center"
        >
          <div className="mr-3 scale-75 lg:scale-100">
            <svg viewBox="0 0 384 512" width="30">
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
          </div>
          <div>
            <div className="text-xs">Descárgalo en el</div>
            <div className="text-lg lg:text-xl font-semibold font-sans -mt-1">
              App Store
            </div>
          </div>
        </a>

        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.qury"
          className="flex mt-3 w-48 h-14 bg-black text-white rounded-lg items-center justify-center"
        >
          <div className="mr-3 scale-75 lg:scale-100">
            <svg viewBox="30 336.7 120.9 129.2" width="30">
              <path
                fill="#FFD400"
                d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
              />
              <path
                fill="#FF3333"
                d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
              />
              <path
                fill="#48FF48"
                d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
              />
              <path
                fill="#3BCCFF"
                d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
              />
            </svg>
          </div>
          <div>
            <div className="text-xs">DiSPONIBLE EN</div>
            <div className="text-lg lg:text-xl font-semibold font-sans -mt-1">
              Google Play
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
