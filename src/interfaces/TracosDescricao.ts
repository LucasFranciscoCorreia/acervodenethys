import type { ReferenciaID } from '@/enums/referencia'

export default interface TracosDescricao {
  id: number
  descricao: string
  titulo: string
  referencia: ReferenciaID[]
}
