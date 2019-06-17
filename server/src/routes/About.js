import { About } from '../controllers'

const routes = [{
    method: 'GET',
    url: '/about.json',
    handler: About.about
}]

export default routes