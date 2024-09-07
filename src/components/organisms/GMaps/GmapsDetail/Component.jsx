import GoogleMapReact from "google-map-react"
import Geocode from "react-geocode"
import { openLink } from "../../../../helpers/newTab"
import { useState, useEffect } from "react"

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY)
Geocode.setLanguage("id")
Geocode.setRegion("id")

const Component = ({
    mapsState,
    lat,
    lng,
    origin,
    proyek,
    alamat,
    mobile
}) => {
    const defaultMapOptions = {
        fullscreenControl: false,
    }

    const [review, setReview] = useState([])
    useEffect(() => {
        Geocode.fromLatLng(Number(lat), Number(lng))
        .then(({ results }) => {
            const { place_id } = results[0]
            const request = {
                placeId: place_id,
                fields: ['name', 'rating', 'user_ratings_total']
            }
            const service = new window.google.maps.places.PlacesService(document.createElement('div'))
            service.getDetails(request, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setReview(place)
                } else {
                console.error("error cant get details places")
                }
            })
        })
        .catch(console.error)
    }, [lat, lng])

//   console.log("DEBUG: Review data by lang lat: ", review)

    const Star = ({type}) => {
        let icon
        switch(type){
            case 'full':
                icon = (<svg xmlns="http://www.w3.org/2000/svg" width="10.549" height="10.051" viewBox="0 0 10.549 10.051">
                <path style={{fill: '#f0d946' }} d="M10.54,5.143a.189.189,0,0,0-.153-.129l-3.416-.5-1.528-3.1a.189.189,0,0,0-.338,0l-1.528,3.1-3.416.5a.189.189,0,0,0-.1.322L2.529,7.746l-.584,3.4a.189.189,0,0,0,.075.185.187.187,0,0,0,.2.014L5.275,9.741,8.33,11.347a.189.189,0,0,0,.274-.2l-.583-3.4,2.472-2.409A.189.189,0,0,0,10.54,5.143Z" transform="translate(0 -1.318)"/>
            </svg>)
                break;
            case 'half':
                icon = ( <svg xmlns="http://www.w3.org/2000/svg" width="10.549" height="10.051" viewBox="0 0 10.549 10.051">
                <g transform="translate(-715.293 -543)">
                    <path style={{fill: '#f0f0f0'}} d="M10.54,5.143a.189.189,0,0,0-.153-.129l-3.416-.5-1.528-3.1a.189.189,0,0,0-.338,0l-1.528,3.1-3.416.5a.189.189,0,0,0-.1.322L2.529,7.746l-.584,3.4a.189.189,0,0,0,.075.185.187.187,0,0,0,.2.014L5.275,9.741,8.33,11.347a.189.189,0,0,0,.274-.2l-.583-3.4,2.472-2.409A.189.189,0,0,0,10.54,5.143Z" transform="translate(715.293 541.682)"/>
                    <path style={{fill: '#f0d946'}} d="M5.444,1.423a.189.189,0,0,0-.338,0l-1.528,3.1-3.416.5a.189.189,0,0,0-.1.322L2.529,7.746l-.584,3.4a.189.189,0,0,0,.075.185.187.187,0,0,0,.2.014L5.275,9.741Z" transform="translate(715.293 541.682)"/>
                </g>
            </svg>)
                break;
            case 'empty':
                icon = (<svg xmlns="http://www.w3.org/2000/svg" width="10.549" height="10.051" viewBox="0 0 10.549 10.051">
                <path style={{ fill: '#f0f0f0'}} d="M10.54,5.143a.189.189,0,0,0-.153-.129l-3.416-.5-1.528-3.1a.189.189,0,0,0-.338,0l-1.528,3.1-3.416.5a.189.189,0,0,0-.1.322L2.529,7.746l-.584,3.4a.189.189,0,0,0,.075.185.187.187,0,0,0,.2.014L5.275,9.741,8.33,11.347a.189.189,0,0,0,.274-.2l-.583-3.4,2.472-2.409A.189.189,0,0,0,10.54,5.143Z" transform="translate(0 -1.318)"/>
            </svg>)
                break;
        }

        return icon
    }

    const FullScreenButton = () => {
        return (
            // <div className="bg-[#DDEFFC] shadow-md shadow-[#1018280F] px-4 py-3 rounded-md absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-[#ffffff] shadow-md shadow-[#1018280F] px-4 py-3 rounded-md absolute top-2 left-2 z-50">
                <button className="flex flex-row gap-2 z-50 items-center justify-center" onClick={() => openLink(`https://www.google.com/maps/search/${lat},${lng}`,true)}>
                    <img src='/icons/small-icons/button_perbesarPeta.svg' alt='icon here' />
                    <p className="text-[#1078CA] font-bold text-[16px]">View larger map</p>
                </button>
            </div>
        )
    }

    const Rating = ({rating = '4.5', maxRating = 5}) => {
        const full = Math.floor(rating)
        const half = rating % 1 !== 0
        const empty = maxRating - Math.ceil(rating)

        return (
            <div className="flex flex-row gap-1">
                {[...Array(full)].map((_, i) => (
                    <Star type="full"  key={`full-star-${i}`} />
                ))}
                {half && <Star type="half" />}
                {[...Array(empty)].map((_, i) => (
                    <Star type="empty" key={`empty-star-${i}`} />
                ))}
            </div>
        )
    }

    const Information = () => {
        const direction = {
            origin: origin.latitude+','+origin.longitude,
            destination: lat+','+lng
        }
        return (
            <div className="absolute bg-white shadow-md w-[315px] h-[136px] rounded-lg flex flex-col gap-[6px] top-4 left-4 p-3 z-50">
                <div className="flex flex-row justify-between gap-2 w-full">
                    <div classname="flex flex-col gap-1 w-[80%]">
                        <p className="font-bold text-[#000000] text-[14px]">{ (proyek.length > 30) ? proyek.substring(0,33) + "..." : proyek }</p>
                        <p className="font-medium text-[#000000] text-[12px] h-[54px]">{ (alamat.length > 95) ? alamat.substring(0,95) + "..." : alamat}</p>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer w-[20%]" onClick={() => openLink(`https://www.google.com/maps/dir/?api=1&origin=${direction.origin}&destination=${direction.destination}`, true)} >
                        <img src="/icons/small-icons/direction_map.svg" width="32px" height="32px" alt="direction icon" />
                        <p className="text-[#1078CA] text-[12px] font-medium">Directions</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    {/* <div id="reviewSection" className="flex flex-row gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-bold text-[14px] text-black">{review?.rating}</p>
                            <Rating rating={review?.rating}/>
                        </div>
                        <p className="font-medium text-[#1078CA]">{review?.user_ratings_total} Reviews</p>
                    </div> */}
                    <button className="text-left font-medium text-[#1078CA]" onClick={() => openLink(`https://www.google.com/maps/search/${lat},${lng}`,true)}>
                        View larger map
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="gmapsApps__wrapperDetailProject">
            { mobile ? ( <FullScreenButton /> ) : ( <Information /> )}
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_APIKEY }}
                center={mapsState.center}
                defaultCenter={mapsState.center}
                defaultZoom={mapsState.zoom}
                zoom={mapsState.zoom}
                options={defaultMapOptions}
            >
                <div class="relative h-10 w-6" 
                    lat={lat} 
                    lng={lng} 
                    style={{
                        width: "50px",
                        height: "50px",
                        position: "relative",
                        top: "-50px",
                        left: "-25px",
                    }}>
                    <img width="50px" height="50px" src="/images/locator.png" />
                </div>
            </GoogleMapReact>
        </div>
    )
}

export default Component