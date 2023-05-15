import { IbgeService } from "@/services/ibge/mod.ts"
import { IbgeApi } from "@/services/ibge/api/mod.ts"
import ky from "ky"

console.log("Hello World")

const ibge = new IbgeService(new IbgeApi(ky))

const estados = await ibge.searchEstadoByName("")

console.log(estados)
