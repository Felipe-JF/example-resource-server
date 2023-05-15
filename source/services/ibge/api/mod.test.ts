import { IbgeApi } from "./mod.ts"
import { assertEquals, assertRejects } from "testing"
import data from "./data-test.json" assert { type: "json" }

Deno.test("IbgeApi", async ({ step }) => {
  await step("Must have return the same data as the server", async () => {
    const api = IbgeApi.test(async () => Response.json(data))
    const estados = await api.getAllEstados()
    assertEquals(estados, data)
  })

  await step(
    "Must throw a validation error on wrong response from IBGE",
    async () => {
      const ibge = IbgeApi.test(async () =>
        Response.json([{ "wrong key": "wrong value" }])
      )
      await assertRejects(() => ibge.getAllEstados())
    },
  )

  await step(
    "Must have request at domain https://servicodados.ibge.gov.br",
    async () => {
      const ibge = IbgeApi.test(async (request) => {
        assertEquals(
          request.url,
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
        )
        return Response.json(data)
      })
      const estados = await ibge.getAllEstados()
      assertEquals(estados, data)
    },
  )
})
