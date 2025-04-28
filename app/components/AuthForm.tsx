import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';  

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Registro
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 w-full">
        {isLogin ? 'Login' : 'Register'}
      </button>
      <p className="text-center">
        {isLogin ? 'New here? ' : 'Already have an account? '}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default AuthForm;
