export default class ApiUtils {
  static version = "1_50";
  static typeSenseApiKey = "mvjrAtMmSlD1GH75s0AoxF2BdyrRRFTm";

  // Production
  static awsBaseUrl = `https://pjrehaisgj.execute-api.us-east-1.amazonaws.com/${this.version}`;
  static quryCloudBaseUrl = "https://qury.cloud/";
  static quryStorage = "https://qurystorage.s3.us-east-1.amazonaws.com";

  static URLS3_NOT_IMAGE = this.quryStorage + "/fotos/producto-sin-imagen.png";
  // static quryStorage = "https://qurystorage.s3.amazonaws.com";
  static typeSenseUrl = "http://52.70.99.222:8108";

  // Development
  // static awsBaseUrl: String = `https://11igkl4gh9.execute-api.us-east-1.amazonaws.com/${this.version}`;

  static defaultRequest = (
    token: string | undefined,
    method: string = "GET",
    data: any = null
  ): RequestInit => {
    return {
      method: method,
      headers: this.defaultAuthHeaders(token),
      body: data,
    };
  };

  static defaultJsonRequest = (
    token: string | undefined,
    method: string = "GET",
    data: any = null
  ): RequestInit => {
    return {
      method: method,
      headers: this.defaultAuthJsonHeaders(token),
      body: data,
    };
  };

  static defaultAuthHeaders = (token: string | undefined): HeadersInit => {
    return {
      "Cache-Control": "no-cache",
      "X-CP-Origen": "app-lambda",
      Authorization: `Bearer ${token}`,
    };
  };

  static defaultAuthJsonHeaders = (token: string | undefined): HeadersInit => {
    return {
      "Cache-Control": "no-cache",
      "X-CP-Origen": "app-lambda",
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    };
  };

  static defaultTypeSenseHeaders = (method: string = "GET"): RequestInit => {
    return {
      method: method,
      headers: {
        "X-TYPESENSE-API-KEY": this.typeSenseApiKey,
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    };
  };
}
