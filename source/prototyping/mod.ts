import { CookieMap } from "https://deno.land/std@0.187.0/http/cookie_map.ts"
import {
  Cookie,
  getSetCookies,
} from "https://deno.land/std@0.187.0/http/cookie.ts"
function teste(fetch: typeof globalThis.fetch) {
  const cookieJar = new Map<string, Cookie>()

  return async function (
    input: string | URL | Request,
    init?: RequestInit & { client: Deno.HttpClient },
  ) {
    const request = new Request(input, init)

    const response = await fetch(request)
    console.log(response.headers)
    const cookies = getSetCookies(response.headers)

    for (const cookie of cookies) {
      if (cookie.value === "") continue
      cookieJar.set(cookie.name, cookie)
    }
    console.log(cookieJar)
    return response
  }
}

teste(async () => {
  const response = new Response()

  new CookieMap(new Request("https://deno.land"), { response }).set(
    "hello",
    "world",
  )
  return response
})(new Request("https://deno.land"))
