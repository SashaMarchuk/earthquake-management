import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GET_EARTHQUAKE, UPDATE_EARTHQUAKE } from '../queries/queries';
import { Earthquake } from '../types/types';

const EarthquakeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EARTHQUAKE, { variables: { id: id ? parseInt(id, 10) : 0 } });
  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE);

  const [earthquake, setEarthquake] = useState<Partial<Earthquake>>({});

  useEffect(() => {
    if (data) {
      setEarthquake(data.earthquake);
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEarthquake({
      ...earthquake,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    if (!id) return;

    updateEarthquake({
      variables: {
        id: parseInt(id, 10),
        updateEarthquakeDto: {
          location: earthquake.location!,
          magnitude: parseFloat(earthquake.magnitude as unknown as string),
          date: new Date(earthquake.date!).toISOString(),
        },
      },
    }).then(() => {
      navigate('/');
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Earthquake</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={earthquake.location || ''}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Magnitude</label>
        <input
          type="number"
          name="magnitude"
          step="0.1"
          min="0"
          max="10"
          value={earthquake.magnitude || ''}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={earthquake.date ? earthquake.date.split('T')[0] : ''}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />
      </div>
      <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save
      </button>
      <Link to="/" className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Go Back
      </Link>
    </div>
  );
};

export default EarthquakeDetails;
