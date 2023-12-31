import { inject } from '@adonisjs/fold'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthService } from 'App/Services/AuthService'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'

@inject()
export default class AuthController {
    constructor(private authService: AuthService) {}

    public async login(context: HttpContextContract) {
        await context.request.validate(LoginValidator)

        const { email, password } = context.request.body()

        return context.response.ok(await this.authService.login({
            credentials: { email, password },
            context
        }))
    }

    public async register(context: HttpContextContract) {
        await context.request.validate(RegisterValidator)

        return context.response.ok(await this.authService.register({
            user: context.request.except(['password_confirmation']),
            context
        }))
    }

    public async logout(context: HttpContextContract) {
        await this.authService.logout({ context })
        
        return context.response.ok({ message: 'Success Logout' })
    }
}