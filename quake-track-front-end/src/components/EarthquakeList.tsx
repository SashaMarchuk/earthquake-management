import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EARTHQUAKES, REMOVE_EARTHQUAKE } from '../queries/queries';
import AddEarthquake from './AddEarthquake';
import { Link } from 'react-router-dom';

const EarthquakeList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { loading, error, data, refetch } = useQuery(GET_EARTHQUAKES, {
    variables: { page, limit },
  });

  const [removeEarthquake] = useMutation(REMOVE_EARTHQUAKE, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleNextPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      refetch({ page: newPage, limit });
      return newPage;
    });
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      refetch({ page: newPage, limit });
      return newPage;
    });
  };

  const handleRemove = (id: number) => {
    removeEarthquake({ variables: { id } });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error :(</p>;

  const { earthquakes, totalCount } = data.getEarthquakes;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto my-4 p-4">
      <AddEarthquake></AddEarthquake>
      <h1 className="text-2xl font-bold mb-4">Earthquakes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Magnitude</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
          </thead>
          <tbody>
          {earthquakes.map((earthquake: any) => (
            <tr key={earthquake.id}>
              <td className="py-2 px-4 border-b text-center">{earthquake.id}</td>
              <td className="py-2 px-4 border-b">{earthquake.location}</td>
              <td className="py-2 px-4 border-b text-center">{earthquake.magnitude}</td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(earthquake.date).toLocaleDateString()}{' '}
                {new Date(earthquake.date).toLocaleTimeString()}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <Link
                  to={`/earthquake/${earthquake.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Go to
                </Link>
                <button
                  onClick={() => handleRemove(earthquake.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="px-4 py-2 mx-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{page} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="px-4 py-2 mx-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EarthquakeList;
