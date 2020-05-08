'use strict'

class StoreTurma {
  get rules() {
    return {
      ano_ingresso: 'required|year',
      semestre_ingresso: 'in:0,1,2',
      ppc_id: 'required|exists:ppcs,id',
    }
  }

  get sanitizationRules() {
    return {
      ano_ingresso: 'to_int',
      semestre_ingresso: 'to_int',
      ppc_id: 'to_int',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get messages() {
    return {
      'ano_ingresso.required': 'Esse campo é obrigatório',
      'ano_ingresso.year': 'Insira um ano válido',
      'ppc_id.required': 'Esse campo é obrigatório',
      'ppc_id.exists': 'Esse PPC não existe no banco de dados',
      'semestre_ingresso.in': 'Semestre de ingresso inválido',
    }
  }
}

module.exports = StoreTurma
