import type { ReferenciaID } from '@/enums/referencia'
import type { Tracos } from '@/enums/tracos'

export default interface AcaoAtividade {
  id: number
  nome: string
  descricao: string
  tipo: number
  tracos: Tracos[]
  requisitos: string[]
  efeitos: string[]
  acionamentos: string[]
  referencia: ReferenciaID[]
}
