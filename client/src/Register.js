import { useState } from 'react';
import { Navigate } from 'react-router-dom';
export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/register', {
        body: JSON.stringify({ username, password, email }),
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });

      console.log(response);
      if(response.ok){
        
            setRedirect(true)
            alert('Registered In Successfully')

        }
        else{
            alert('Wrong Credentials')
        }
    }

      // Check for success and update redirect state if needed
      // Example: if (response.status === 200) setRedirect(true);
     catch (error) {
      console.error('Registration error:', error);
    }
  }
  if(redirect){
    return(
        <Navigate to={'/login'}/>
    )
}
  return (
    <div className='container '>
      <h1 className='text-center'>Register - Page</h1>
      <form onSubmit={register}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            name="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
