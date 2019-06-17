import { User } from '../controllers'

const routes = [{
        method: 'GET',
        url: '/users',
        handler: User.listUsers
    },
    {
        method: 'GET',
        url: '/users/:userId',
        handler: User.getUser
    },
    {
        method: 'POST',
        url: '/users',
        handler: User.createUser
    },
    {
        method: 'PUT',
        url: '/users/:userId',
        handler: User.updateUser
    },
    {
        method: 'DELETE',
        url: '/users/:userId',
        handler: User.deleteUser
    }
]

export default routes