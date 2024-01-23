// const withAmplify = require("@aws-amplify/adapter-nextjs/with-amplify");
// const config = require("./amplifyconfiguration.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: [
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "qurystorage.s3.us-east-1.amazonaws.com",
      "qurystorage.s3.amazonaws.com",
      "lh3.googleusercontent.com",
      "localhost",
      "127.0.0.1",
      "i.pravatar.cc",
      "cdn1.iconfinder.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/aws-api/:path*",
        destination:
          "https://pjrehaisgj.execute-api.us-east-1.amazonaws.com/1_50/:path*",
      },
      {
        source: "/payment-gateway-api/:path*",
        destination: "https://secure.micuentaweb.pe/:path*",
      },
      {
        source: "/typesense-api/:path*",
        destination: "http://52.70.99.222:8108/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

// module.exports = runWithAmplifyServerContext(nextConfig, {
//   Auth: {
//     Cognito: {
//       userPoolId: "us-east-1_ZPe1B2fvp",
//       userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
//       identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
//     },
//   },
// });
