import { Router } from 'express'

import multer from 'multer'
import uploadConfig from './config/upload'

import OrphanagesControllers from './controllers/OrphanagesControllers'

const routes = Router()
const upload = multer(uploadConfig)

routes.post('/orphanages', upload.array('images'), OrphanagesControllers.create)
routes.get('/orphanages', OrphanagesControllers.index)
routes.get('/orphanages/:id', OrphanagesControllers.show)
 export default routes