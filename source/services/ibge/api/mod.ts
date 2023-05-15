import ky from "ky"
import { z } from "zod"

export const getAllestadoResponseSchema = z.array(
  z.object({
    id: z.number(),
    sigla: z.string(),
    nome: z.string(),
    regiao: z.object({
      id: z.number(),
      sigla: z.string(),
      nome: z.string(),
    }),
  }),
)

export const getMunicipiosByUfData = z.array(
  z.object({}),
)

export type getAllEstadosResponse = z.infer<typeof getAllestadoResponseSchema>

export class IbgeApi {
  private session: typeof ky

  constructor(session: typeof ky) {
    this.session = session.extend({
      prefixUrl: "https://servicodados.ibge.gov.br",
    })
  }

  static test(fetch: (request: Request) => Promise<Response>) {
    return new IbgeApi(ky.create({
      async fetch(input: RequestInfo, init?: RequestInit) {
        return fetch(new Request(input, init))
      },
    }))
  }

  async getAllEstados(): Promise<getAllEstadosResponse> {
    const data = await this.session
      .get("./api/v1/localidades/estados")
      .json()

    const estados = await getAllestadoResponseSchema.parseAsync(data)

    return estados
  }

  async getMunicipiosByUf(uf: string) {
    const data = await this.session
      .get(`./api/v1/localidades/estados/${uf}/municipios`)
      .json()
  }
}
