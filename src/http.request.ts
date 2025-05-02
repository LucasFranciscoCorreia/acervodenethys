import axios from "axios";
import type Condicao from "./interfaces/Condicao";
import { ancestralidadeCache, condicoesCache, referenciasCache } from "./cache";
import type Referencia from "./interfaces/Referencia";
import type Talento from "./interfaces/Talento";
import type Ancestralidade from "./interfaces/Ancestralidade";

import talentos from "@/data/talentos.json";

export default class HttpRequest {
  private static _instance: HttpRequest;

  private constructor() {}

  public static get instance(): HttpRequest {
    if (!this._instance) {
      this._instance = new HttpRequest();
    }
    return this._instance;
  }

  public async getCondicoes(): Promise<Condicao[]> {
    if (!condicoesCache.data) {
      const condicoes = await axios.post('http://localhost:3000/graphql', {
        "query": "query { condicoes { id condicao descricao } }"
      });
      console.log(condicoes.data.data.condicoes);
      condicoesCache.data = condicoes.data.data.condicoes as Condicao[];
    }
    return condicoesCache.data;
  }

  public async getReferencias(): Promise<Referencia[]> {
    if (!referenciasCache.data) {
      const referencias = await axios.post('http://localhost:3000/graphql', {
        "query": "query { referencias { id titulo url urlPaizo} }"
      })
      referenciasCache.data = referencias.data.data.referencias as Referencia[];
    }
    return referenciasCache.data;
  }

  public async getTalentos(): Promise<Talento[]> {
    return talentos as Talento[];
  }

  public async getAncestralidades(): Promise<Ancestralidade[]> {
    if (!ancestralidadeCache.data) {
      const ancestralidades = await axios.post('http://localhost:3000/graphql', {
        "query": "query { ancestralidades { id ancestralidade descricao href explicacao tracos} }"
      });
      ancestralidadeCache.data = ancestralidades.data.data.ancestralidades as Ancestralidade[];
    }
    return ancestralidadeCache.data;
  }
}
