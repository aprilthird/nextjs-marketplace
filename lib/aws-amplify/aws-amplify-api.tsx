// import { API, Auth, Amplify } from "aws-amplify";
// import ApiUtils from "../utils/api-utils";
// import awsExports from "@/aws-exports";

// export default class AwsAmplifyApi {
//   static apiName = "QuryAppApi";

//   static configRequestHeaders = (data: any, headers: any): any => {
//     var params = {
//       headers: {
//         "Cache-Control": "no-cache",
//         "X-CP-Origen": "app-lambda",
//         //Authorization: token,
//       },
//       pathParams: data,
//     };
//     if (!headers) {
//       headers = {};
//     }
//     params.headers = Object.assign(params.headers, headers);
//     return params;
//   };

//   static onSuccess = (response: any, url: string) => {};

//   static onError = (error: any, url: string) => {
//     console.log({ url: url, onError: error });
//   };

//   static awsConfiguration = {
//     aws_project_region: "us-east-1",
//     aws_cognito_identity_pool_id:
//       "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
//     aws_cognito_region: "us-east-1",
//     aws_user_pools_id: "us-east-1_ZPe1B2fvp",
//     aws_user_pools_web_client_id: "4mqcbuvs553kiucfp5jqtju0n5",
//     oauth: {},
//     API: {
//       endpoints: [
//         {
//           name: "QuryAppApi",
//           endpoint: ApiUtils.awsBaseUrl,
//           // custom_header: async () => {
//           //   Amplify.configure({ ...awsExports, ssr: true });
//           //   return {
//           //     Authorization: `Bearer ${(await Auth.currentSession())
//           //       .getIdToken()
//           //       .getJwtToken()}`,
//           //   };
//           // },
//         },
//       ],
//     },
//     ssr: true,
//   };

//   static getAsync = async (path: string, params: any, headers: any) => {
//     API.configure(this.awsConfiguration);
//     let reqConfig = this.configRequestHeaders(params.data, headers);
//     let response = await API.get(this.apiName, path, reqConfig);
//     console.log(response);
//     //   .then((response) => {
//     //     if (!response) {
//     //       response = {};
//     //     }
//     //     this.onSuccess(response, path);
//     //     params.onSuccess(response);
//     //   })
//     //   .catch((error) => {
//     //     this.onError(error, path);
//     //     params.onError(error);
//     //   });
//   };

//   static postAsync = async (path: string, params: any, headers: any) => {
//     let reqConfig = this.configRequestHeaders(params.data, headers);
//     try {
//       var response = await API.post(this.apiName, path, reqConfig);
//       if (!response) {
//         response = {};
//       }
//       this.onSuccess(response, path);
//       params.onSuccess(response);
//     } catch (error) {
//       this.onError(error, path);
//       params.onError(error);
//     }
//   };

//   static patchAsync = async (path: string, params: any, headers: any) => {
//     let reqConfig = this.configRequestHeaders(params.data, headers);
//     await API.patch(this.apiName, path, reqConfig)
//       .then((response) => {
//         if (!response) {
//           response = {};
//         }
//         this.onSuccess(response, path);
//         params.onSuccess(response);
//       })
//       .catch((error) => {
//         this.onError(error, path);
//         params.onError(error);
//       });
//   };

//   static deleteAsync = async (path: string, params: any, headers: any) => {
//     let reqConfig = this.configRequestHeaders(params.data, headers);
//     await API.del(this.apiName, path, reqConfig)
//       .then((response) => {
//         if (!response) {
//           response = {};
//         }
//         // this.onSuccess(response, path);
//         params.onSuccess(response);
//       })
//       .catch((error) => {
//         this.onError(error, path);
//         params.onError(error);
//       });
//   };
// }
