import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import axios from 'axios';
import './App.css';

function App() {
  const [pins, setPins] = useState();
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 5.6037,
    longitude: -0.187,
    zoom: 6,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mkinful/ckqyeakct3fwb17mtto68n3fy"
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room style={{ fontSize: viewport.zoom * 6, color: 'crimson' }} />
            </Marker>
            {
              <Popup
                latitude={5.8143}
                longitude={-0.183}
                closeButton={true}
                closeOnClick={false}
                anchor="right"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">Kwame Nkrumah Memorial Park</h4>
                  <label>Review</label>
                  <p className="desc">Extraordinary sense of history.</p>
                  <label>Rating</label>
                  <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>Ebo</b>
                  </span>
                  <span className="date">3 hours ago</span>
                </div>
              </Popup>
            }
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
