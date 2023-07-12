import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTaskValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        user: this.ctx.auth.user
    })

    public schema = schema.create({
        name: schema.string({}, [
            rules.required(),
        ]),
        task_category_id: schema.number.nullableAndOptional([
            rules.exists({
                table: 'task_categories',
                column: 'id',
                where: {
                    user_id: this.refs.user.value?.id
                }
            })
        ]),
        task_status_id: schema.number.nullableAndOptional([
            rules.exists({
                table: 'task_statuses',
                column: 'id',
                where: {
                    user_id: this.refs.user.value?.id
                }
            })
        ])
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}