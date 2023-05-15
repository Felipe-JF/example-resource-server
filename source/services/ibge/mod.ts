import { IbgeApi } from "./api/mod.ts"

export class IbgeService {
  constructor(private api: IbgeApi) {
  }

  static test(data: Awaited<ReturnType<IbgeApi["getAllEstados"]>>) {
    const api = IbgeApi.test(async () => Response.json(data))
    return new IbgeService(api)
  }

  async searchEstadoByName(name: string) {
    const estados = await this.api.getAllEstados()
    return estados.filter((estado) => estado.nome.includes(name))
  }
}
