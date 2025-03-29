
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page with register tab active
    navigate('/login?tab=register', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to registration page...</p>
    </div>
  );
};

export default Register;
