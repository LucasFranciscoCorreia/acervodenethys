import type { ReferenciaID } from '@/enums/referencia'
import type { Tracos } from '@/enums/tracos'
import type { TradicaoMagia } from '@/enums/tradicaoMagia'

export default interface Magia {
  id: number
  magia: string
  tradicao: TradicaoMagia[]
  descricao: string
  ranque: number
  tracos: Tracos[]
  referencia: ReferenciaID[]
}
