import ApiUtils from "@/lib/utils/api-utils";
import { Amplify } from "aws-amplify";
import {
  signIn,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  updatePassword,
  SignUpInput,
  ResendSignUpCodeInput,
  ConfirmSignUpInput,
  ResetPasswordInput,
  ConfirmResetPasswordInput,
  UpdatePasswordInput,
} from "aws-amplify/auth";
import NewUser from "@/lib/models/new-user";
import awsExports from "@/aws-exports";
import ResetPassword from "../models/reset-password";
import UpdatePassword from "../models/update-password";

export default class AuthService {
  static async signIn(email: string, password: string) {
    try {
      // const deviceToken = store.getState().application.deviceToken;
      // signIn({ email, password})
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } catch (e) {
      console.error(e);
    }
  }

  static async signUp(newUser: NewUser) {
    try {
      console.log(newUser);
      var requestData: SignUpInput = newUser.isBusiness
        ? {
            username: newUser.email,
            password: newUser.password,
            options: {
              userAttributes: {
                email: newUser.email,
                phone_number: `+51${newUser.phoneNumber}`,
                name: "",
                family_name: "",
                "custom:tipoDocumento": "RUC",
                "custom:numeroDocumento": newUser.document,
                "custom:nombreEmpresa": newUser.tradename,
                "custom:razonSocial": newUser.businessName,
                "custom:direccion": newUser.address,
                "custom:deviceToken": "",
                "custom:deviceTokenOS": "",
              },
            },
          }
        : {
            username: newUser.email,
            password: newUser.password,
            options: {
              userAttributes: {
                email: newUser.email,
                phone_number: `+51${newUser.phoneNumber}`,
                name: newUser.firstName,
                family_name: newUser.lastName,
                "custom:tipoDocumento": newUser.documentType,
                "custom:numeroDocumento": newUser.document,
                "custom:userName": newUser.username,
                "custom:nombreEmpresa": "",
                "custom:razonSocial": "",
                "custom:direccion": "",
                "custom:deviceToken": "",
                "custom:deviceTokenOS": "",
              },
            },
          };

      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolId: "us-east-1_ZPe1B2fvp",
              userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
              identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
            },
          },
        },
        {
          ssr: true,
        }
      );
      const result = await signUp(requestData);
      console.log(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async confirmSignUp(username: string, otpCode: string) {
    try {
      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolId: "us-east-1_ZPe1B2fvp",
              userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
              identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
            },
          },
        },
        {
          ssr: true,
        }
      );
      var input: ConfirmSignUpInput = {
        username: username,
        confirmationCode: otpCode,
      };
      const result = await confirmSignUp(input);
      console.log(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async resendSignUpCode(username: string) {
    try {
      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolId: "us-east-1_ZPe1B2fvp",
              userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
              identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
            },
          },
        },
        {
          ssr: true,
        }
      );
      var input: ResendSignUpCodeInput = {
        username: username,
      };
      await resendSignUpCode(input);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async resetPassword(email: string) {
    try {
      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolId: "us-east-1_ZPe1B2fvp",
              userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
              identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
            },
          },
        },
        {
          ssr: true,
        }
      );
      var input: ResetPasswordInput = {
        username: email,
      };
      await resetPassword(input);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async confirmResetPassword(data: ResetPassword) {
    try {
      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolId: "us-east-1_ZPe1B2fvp",
              userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
              identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
            },
          },
        },
        {
          ssr: true,
        }
      );
      var input: ConfirmResetPasswordInput = {
        username: data.email,
        confirmationCode: data.otpCode,
        newPassword: data.newPassword,
      };
      await confirmResetPassword(input);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async updatePassword(data: UpdatePassword) {
    try {
      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolId: "us-east-1_ZPe1B2fvp",
              userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
              identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
            },
          },
        },
        {
          ssr: true,
        }
      );
      var input: UpdatePasswordInput = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      await updatePassword(input);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
