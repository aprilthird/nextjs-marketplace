import ApiUtils from "@/lib/utils/api-utils";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from Next.js!" });
}

export async function POST(request: NextRequest) {
  const { id, firstName, lastName, document, phoneNumber, email, action_mode } =
    await request.json();

  const pad2 = (n: number) => {
    return n < 10 ? "0" + n : n;
  };

  //PRODUCTION
  const key = "CcS2NeFXPIDJrBCH";
  let env = "PRODUCTION";
  let url = `${ApiUtils.awsBaseUrl}/returnPayres?val1=${id}`;

  //TEST
  // const key = "Mjn1UrBmDjtrrHxG";
  // let env = "TEST";
  // let url = "";

  const date = new Date();
  var parsedDate =
    date.getUTCFullYear().toString() +
    pad2(date.getUTCMonth() + 1) +
    pad2(date.getUTCDate()) +
    pad2(date.getUTCHours()) +
    pad2(date.getUTCMinutes()) +
    pad2(date.getUTCSeconds());

  let pageAction = "REGISTER";
  let language = "ES";
  let currency = "604";
  let pageMode = action_mode ?? "IFRAME";
  let country = "PE";
  let merchantCode = "22496368";
  let version = "V2";

  let trx = `${pageMode}+${env}+${currency}+${phoneNumber}+${country}+${email}+${firstName}+${lastName}+${document}+${language}+${pageAction}+${merchantCode}+${parsedDate}+${url}+${version}+${key}`;
  const hash = crypto
    .createHmac("sha256", key)
    .update(Buffer.from(trx, "utf-8"))
    .digest("base64");

  var result = {
    res: {
      signature: hash,
      trx: trx,
      currentDate: parsedDate,
      action_mode,
    },
  };

  return NextResponse.json({ result });
}
