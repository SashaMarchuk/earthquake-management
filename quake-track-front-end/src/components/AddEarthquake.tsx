import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EARTHQUAKE, GET_EARTHQUAKES } from '../queries/queries';

interface FormState {
  location: string;
  magnitude: number;
  date: string;
}

const AddEarthquake: React.FC = () => {
  const initialFormState: FormState = {
    location: '',
    magnitude: 0,
    date: '',
  };

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [addEarthquake, { loading }] = useMutation(CREATE_EARTHQUAKE, {
    refetchQueries: [{ query: GET_EARTHQUAKES, variables: { page: 1, limit: 10 } }],
    onCompleted: () => {
      setFormState(initialFormState);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === 'magnitude' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.location || !formState.magnitude || !formState.date) {
      alert('All fields are required');
      return;
    }

    const formattedDate = new Date(formState.date).toISOString();
    addEarthquake({ variables: { createEarthquakeDto: { ...formState, date: formattedDate } } });
  };

  const generateRandomData = () => {
    const randomLatitude = (Math.random() * 180 - 90).toFixed(6);
    const randomLongitude = (Math.random() * 360 - 180).toFixed(6);
    const randomMagnitude = (Math.random() * (10 - 0.1) + 0.1).toFixed(1);
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 1e10)).toISOString().split('T')[0];

    setFormState({
      location: `${randomLatitude}, ${randomLongitude}`,
      magnitude: parseFloat(randomMagnitude),
      date: randomDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Add Earthquake</h2>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formState.location}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
        disabled={loading}
      />
      <input
        type="number"
        name="magnitude"
        placeholder="Magnitude"
        value={formState.magnitude}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
        disabled={loading}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        value={formState.date}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
        disabled={loading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <button
        type="button"
        onClick={generateRandomData}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
      >
        Generate Random Data
      </button>
    </form>
  );
};

export default AddEarthquake;
