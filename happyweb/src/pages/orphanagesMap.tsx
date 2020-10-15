import React,  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { FiPlus, FiArrowRight } from 'react-icons/fi'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import MapIcon from '../utils/mapIcon'
import api from '../services/api'

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [])

    return(
        <div id='page-map'>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt='MapMarker'/>

                    <h2>Escolha um Orfanato no Mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Manaus</strong>
                    <span>Amazonas</span>
                </footer>
            </aside>
        
            <Map
                center={[-3.1109849, -59.9912634]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
               {/*  <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/> */}
                <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            
            {orphanages.map(orphanage =>{
                return(
                <Marker
                     icon={MapIcon}
                     position={[orphanage.latitude, orphanage.longitude]}
                     key={orphanage.id}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color='#fff' />
                        </Link>
                    </Popup > 
                </Marker>
                )})}
            </Map>

            <Link to='/orphanages/create' className='create-orphanage'>
                <FiPlus size={32} color='#fff'/>
            </Link>
        </div>
    )
}
export default OrphanagesMap