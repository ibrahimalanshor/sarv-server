/*
|--------------------------------------------------------------------------
| Define HTTP rate limiters
|--------------------------------------------------------------------------
|
| The "Limiter.define" method callback receives an instance of the HTTP
| context you can use to customize the allowed requests and duration
| based upon the user of the request.
|
*/

import { Limiter } from '@adonisjs/limiter/build/services'

export const { httpLimiters } = Limiter
  .define('forgot-password', () => {
    return Limiter.allowRequests(1).every('1 hour')
  })
  .define('resend-verification', () => {
    return Limiter.allowRequests(1).every('1 hour')
  })
