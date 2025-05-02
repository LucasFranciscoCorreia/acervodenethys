import type Ancestralidade from "./interfaces/Ancestralidade"
import type Condicao from "./interfaces/Condicao"
import type Referencia from "./interfaces/Referencia"
import type Talento from "./interfaces/Talento"

export const condicoesCache: {
  data: Condicao[] | null
} = {
  data: null,
}

export const referenciasCache: {
  data: Referencia[] | null
} = {
  data: null,
}

export const talentosCache: {
  data: Talento[] | null
} = {
  data: null,
}

export const ancestralidadeCache: {
  data: Ancestralidade[] | null
} = {
  data: null,
}
