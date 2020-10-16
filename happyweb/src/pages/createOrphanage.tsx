import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import api from "../services/api";

import SideBar from "../components/sideBar";

import '../styles/pages/create-orphanage.css';
import MapIcon from "../utils/mapIcon";

export default function CreateOrphanage() { 
  const history = useHistory()

  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])//Array de Array de Arquivos
  const [previewImages, setPreviewImages] = useState<string[]>([])//Array de Array de String

  function handleMapClick(event: LeafletMouseEvent){
    console.log(event)
     const { lat, lng } = event.latlng

    setPosition({
     latitude: lat,
     longitude: lng
    }) 
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault()//previnir comportamente de reload de forms

    const { latitude, longitude } = position

    const data = new FormData()//O Form vem em Multipart de formato e nao json

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))//number
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    
    images.forEach(images=>{  
      data.append('images', images)
    })
    
    await api.post('/orphanages', data)

    alert('Cadastro Realizado com sucesso')
    history.push('/app')
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    //preview de todas as imagens
    const selectedImagesPreview =selectedImages.map(image =>{
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  return (
    <div id="page-create-orphanage">
      <SideBar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              { position.latitude !== 0 ? 
                (
                  <Marker interactive={false} icon={MapIcon} position={[position.latitude,position.longitude]} />  
                ):
                  null //se a condicao tem else como null pode ser substituido o ? por &&
              }
          
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
              id="name" 
              value={name} 
              onChange={ e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" 
              maxLength={300} 
              value={about} 
              onChange={ e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              
              <div className="images-container">
                {previewImages.map(image =>{
                  return(
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id='image[]'/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
              id="instructions" 
              value={instructions} 
              onChange={ e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de Visitas</label>
              <input 
              id="opening_hours" 
              value={opening_hours} 
              onChange={ e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                  >Sim
                </button>
                <button 
                type="button"
                className={!open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(false)}
                  >Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
