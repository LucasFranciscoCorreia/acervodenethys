import type { Tracos } from '@/enums/tracos'

export default interface Ancestralidade {
  id :number
  ancestralidade: string
  descricao: string
  href: string
  explicacao: string
  idTracos: Tracos[]
}
