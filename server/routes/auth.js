import auth from '../controllers/user.js'
import koaRouter from 'koa-router'

const router=koaRouter()

router.post('/register',auth.registerAccount)
router.post('/login',auth.loginAccount)
router.post('/verify',auth.verifyAccount)

export default router