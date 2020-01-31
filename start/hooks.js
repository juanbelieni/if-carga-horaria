const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Database = use('Database')

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
      */
      return
    }

    const [table, column] = args
    const row = await Database.table(table).where(column, value).first()

    if (!row) {
      throw message
    }
  }

  const yearFn = async (data, field, message, args, get) => {
    const value = parseInt(get(data, field), 10)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
      */
      return
    }

    if (value < 2000 || value > 2100) {
      throw message
    }
  }

  Validator.extend('exists', existsFn)
  Validator.extend('year', yearFn)
})
