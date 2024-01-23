import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";

import config from "../../amplifyconfiguration.json";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const serverClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});
