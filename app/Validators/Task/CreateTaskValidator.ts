import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTaskValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        user: this.ctx.auth.user
    })

    public schema = schema.create({
        name: schema.string({}, [
            rules.required(),
        ]),
        description: schema.string.nullableAndOptional(),
        due_date: schema.date.nullableAndOptional(),
        priority: schema.number.nullableAndOptional([
            rules.range(1, 3)
        ]),
        status: schema.enum.nullableAndOptional(['todo', 'pending', 'in-progress', 'done']),
        task_category_id: schema.number.nullableAndOptional([
            rules.exists({
                table: 'task_categories',
                column: 'id',
                where: {
                    user_id: this.refs.user.value?.id
                }
            })
        ]),
        parent_id: schema.number.nullableAndOptional([
            rules.exists({
                table: 'tasks',
                column: 'id',
                where: {
                    user_id: this.refs.user.value?.id,
                    parent_id: null
                }
            })
        ])
    })

    public messages: CustomMessages = {}

    public cacheKey = `${this.ctx.routeKey}-${this.ctx.auth.user?.id}`
}