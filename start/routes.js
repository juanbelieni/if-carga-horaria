'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.resource('ppcs', 'PpcController')
  .apiOnly()
  .validator(
    new Map([[['ppcs.store'], ['StorePpc']]]),
    new Map([[['ppcs.update'], ['UpdatePpc']]]),
  )

Route.resource('disciplinas', 'DisciplinaController')
  .apiOnly()
  .validator(
    new Map([[['disciplinas.store'], ['StoreDisciplina']]]),
    new Map([[['disciplinas.update'], ['UpdateDisciplina']]]),
  )

Route.resource('turmas', 'TurmaController')
  .apiOnly()
  .validator(
    new Map([[['turmas.store'], ['StoreTurma']]]),
    new Map([[['turmas.update'], ['UpdateTurma']]]),
  )

Route.resource('professores', 'ProfessorController')
  .apiOnly()
  .validator(
    new Map([[['professores.store'], ['StoreProfessor']]]),
  )

Route.resource('cargas', 'CargaController')
  .only(['index', 'store'])
  .validator(
    new Map([[['cargas.store'], ['StoreCarga']]]),
  )
