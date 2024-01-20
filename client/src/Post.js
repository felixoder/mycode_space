import React from 'react';
import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

export default function Post({ _id, title, summery, createdAt, author }) {
  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '18rem', height: '25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="https://images.unsplash.com/photo-1682687220161-e3e7388e4fad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
        <div className="texts mt-3" style={{ width: '100%' }}>
          <Link to={`/post/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-body text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <h5 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h5>
                <p className="author" style={{ fontSize: '1rem', color: '#777' }}>{author?.username || 'Unknown Author'}</p>
                <time style={{ fontSize: '0.8rem', color: '#999' }}>{formatISO9075(new Date(createdAt))}</time>
              </div>
              <p className="card-text mt-3">{summery}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
