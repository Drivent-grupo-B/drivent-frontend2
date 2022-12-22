import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import HotelCard from '../../../components/Hotel/HotelCard.js';
import useBooking from '../../../hooks/api/useBooking.js';
import useHotel from '../../../hooks/api/useHotel.js';
import { useState } from 'react';
import Button from '../../../components/Form/Button.js';

function MapHotels({ hotel, header, newBooking }) {
  return(
    <>
      <StyledTypography variant="h6">{ header }</StyledTypography>        
      <CardsContainer>
        {
          hotel ? hotel.map((hotel) => (
            <HotelCard hotel={hotel} newBooking={newBooking} key={hotel.id}/>
          )
          )
            :
            'Não tem hotéis cadastrados!'
        }
      </CardsContainer>
    </>
  );
}

function selectHotels({ isClicked, setIsClicked, newBooking }) {
  const { booking } = useBooking(); 
  const { hotels } = useHotel();
  const [changeRoom, setChangeRoom] = useState(false);
  let header = 'Primeiro, escolha seu hotel:';  
  if(!hotels) return [];
 
  if((!booking && !newBooking) || (changeRoom && !isClicked)) { 
    hotels.forEach((hotel) => hotel.reserved = false);  
    return <MapHotels hotel={hotels} header={header} />;
  }
  header = 'Você já escolheu seu quarto:';

  const oneHotel = hotels.filter( (hotel) => booking ? booking.Room.hotelId === hotel.id : newBooking.Room.hotelId === hotel.id);

  oneHotel[0]['reserved']=true;

  oneHotel[0]['selectHotels']=selectHotels;

  return (
    <>
      <MapHotels hotel={oneHotel} newBooking={newBooking} header={header} />
      <Button onClick={() => {setChangeRoom(true); setIsClicked(false);}}>Trocar de Quarto</Button>
    </>
  );
}

export default function Hotels({ isClicked, setIsClicked, newBooking }) {
  return(
    <>
      {
        selectHotels({ isClicked, setIsClicked, newBooking })          
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const CardsContainer = styled.div`
  display: flex ;
  width: 100% ;
`;
