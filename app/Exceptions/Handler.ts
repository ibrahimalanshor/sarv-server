/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (error.code === 'E_INVALID_AUTH_UID' || error.code === 'E_INVALID_AUTH_PASSWORD') {
      return ctx.response.unauthorized({ message: 'Invalid Credential' })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.unauthorized({ message: 'Unauthorized' })
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.notFound({ message: 'Resource Not Found' })
    }

    if (error.code === 'ERR_NON_2XX_3XX_RESPONSE') {
      return ctx.response.unauthorized({ message: 'Invalid token' })
    }

    return super.handle(error, ctx)
  }
}
