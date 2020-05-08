'use strict'

class StoreDisciplina {
  get rules() {
    return {
      ppc_id: 'exists:ppcs,id',
    }
  }

  get sanitizationRules() {
    return {
      periodo: 'to_int',
      duracao_aula: 'to_int',
      aulas_semana: 'to_int',
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
      'ppc_id.exists': 'Esse PPC não existe no banco de dados',
    }
  }
}

module.exports = StoreDisciplina
