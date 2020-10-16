import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanagesView'
import * as Yup from 'yup'

export default {
    async index(req: Request, res: Response){
        const orphanages = await getRepository(Orphanage).find({
            relations: ['images']
        })
        
        return res.json(orphanageView.renderMany(orphanages))
    },

    async create(req: Request, res: Response){

    const { 
       name,
       latitude,
       longitude,
       about,
       instructions,
       opening_hours,
       open_on_weekends,
    } = req.body
 
    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = req.files as Express.Multer.File[] //hack para lidar com up de files
    const images = requestImages.map(image => {
        return { path: image.filename }
    })
 
    const data = {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends: open_on_weekends === 'true',//para que seja convertido o boolean em string pelo form do frontend
        images
    }
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        images:Yup.array(
            Yup.object().shape({
                path: Yup.string().required()
        }))
    })

    await schema.validate(data, {
        abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data)
 
    await orphanagesRepository.save(orphanage)
 
    return res.status(201).json(orphanage)
    },

    async show(req: Request, res: Response){
        const { id } = req.params

        const orphanage = await getRepository(Orphanage).findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanageView.render(orphanage))
    },
    //Delete e Update

}