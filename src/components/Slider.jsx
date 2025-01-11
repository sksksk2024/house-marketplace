import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';

// import 'swiper.min.css'; // Correct CSS import
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; // Correct module imports
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide

import Spinner from './Spinner';

// Initialize Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        const data = doc.data();
        listings.push({
          id: doc.id,
          data: {
            ...data,
            imgUrls: data.imgUrls || [], // Ensure imgUrls is an empty array if missing
          },
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    <>
      <p className="exploreHeading">Recommended</p>

      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listings.map(({ data, id }) => (
          <SwiperSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${id}`)}
          >
            <div
              style={{
                background: `url(${
                  data.imgUrls && data.imgUrls[0]
                    ? data.imgUrls[0]
                    : 'default-image.jpg'
                }) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className="swiperSlideDiv"
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                ${data.discountedPrice ?? data.regularPrice}{' '}
                {data.type === 'rent' && '/ month'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
