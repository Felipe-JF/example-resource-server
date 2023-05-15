import { IbgeService } from "./mod.ts"
import data from "./api/data-test.json" assert { type: "json" }
import { assertArrayIncludes, assertEquals } from "testing"

Deno.test("IbgeService.prototype.searchEstadoByName", async ({ step }) => {
  const service = IbgeService.test(data)

  await step("Should search filter Mato", async () => {
    const estados = await service.searchEstadoByName("Mato")
    assertArrayIncludes(estados, [{
      id: 50,
      sigla: "MS",
      nome: "Mato Grosso do Sul",
      regiao: { id: 5, sigla: "CO", nome: "Centro-Oeste" },
    }, {
      id: 51,
      sigla: "MT",
      nome: "Mato Grosso",
      regiao: { id: 5, sigla: "CO", nome: "Centro-Oeste" },
    }])
  })

  await step("Should search not filter lowercase mato", async () => {
    for (const name of ["mato", "rond", "sao"] as const) {
      const estados = await service.searchEstadoByName(name)
      assertEquals(estados, [])
    }
  })
})
