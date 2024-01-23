import User from "@/lib/models/user";
import { User as SessionUser } from "next-auth/core/types";
import ApiUtils from "@/lib/utils/api-utils";
import UrlUtils from "../utils/url-utils";
import { Session } from "next-auth";

export default class UserService {
  static searchUrl = `${ApiUtils.awsBaseUrl}/busqueda`;
  static usersUrl = `aws-api/usuarios`;
  static deleteUserUrl = `${ApiUtils.awsBaseUrl}/deleteuser`;
  static usernameUrl = `${ApiUtils.awsBaseUrl}/search`;

  static async getByQuryId(quryId: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.searchUrl}/${quryId}`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      if (data[0]?.id) {
        const result = data.map((e: any) => User.fromJson(e));
        return result.length > 0 ? result[0] : null;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  }

  static async getByUserLogin(userLogin: string): Promise<User | null> {
    try {
      const response = await fetch(
        UrlUtils.getURL(`${this.usersUrl}?userLogin=${userLogin}`),
        {
          cache: "no-store",
          next: { revalidate: 0 },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const result = data.map((e: any) => User.fromJson(e));
        return result.length > 0 ? result[0] : null;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  }

  static async updateProfile(
    session: Session,
    user: SessionUser
  ): Promise<boolean> {
    try {
      const requestData = {
        id: user.id,
        descripcion: user.description && user.description.trim(),
        categoria: user.categoryId,
        subcategoria: user.subCategoryId,
      };
      const response = await fetch(UrlUtils.getURL(this.usersUrl), {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "PATCH",
          JSON.stringify(requestData)
        ),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return false;
  }

  static async deleteUser(email: string): Promise<boolean> {
    try {
      const requestData = {
        email: email,
      };
      const response = await fetch(`${this.deleteUserUrl}`, {
        method: "POST",
        body: JSON.stringify(requestData),
        next: { revalidate: 0 },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return false;
  }

  static async delete(session: Session): Promise<boolean> {
    try {
      const response = await fetch(UrlUtils.getURL(`${this.usersUrl}`), {
        ...ApiUtils.defaultJsonRequest(session.token, "DELETE", null),
        credentials: "omit",
        next: { revalidate: 0 },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return false;
  }

  static async usernameExists(username: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.usernameUrl}/${username}`, {
        next: { revalidate: 0 },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return false;
  }
}
