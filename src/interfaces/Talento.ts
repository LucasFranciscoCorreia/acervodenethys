import type { ReferenciaID } from '@/enums/referencia'
import type { Tracos } from '@/enums/tracos'

export default interface Talento {
  id: number
  titulo: string
  descricao: string
  nivel: number
  tracos: Tracos[],
  referencia: ReferenciaID[]
}
