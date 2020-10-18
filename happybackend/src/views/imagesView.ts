import Images from "../models/Image"

export default {
    render(image: Images){
        return{
            id: image.id,
            url: `http://192.168.0.17:3333/uploads/${image.path}`//localhost - por hora ip da maquina expo
        }
    },

    renderMany(images: Images[]){
        return images.map(image => this.render(image))
    }
}