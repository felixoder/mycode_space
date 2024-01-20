import { useEffect, useState } from 'react';
import Post from '../Post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mycode-space-api.vercel.app/post');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('There was an error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {error ? (
          <p>{error}</p>
        ) : (
          posts.length > 0 &&
          posts.map((post) => (
            <div key={post._id} className="col" style={{ height: '300px' }}>
              <Post {...post} className="h-100"style={{ height: '300px' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
