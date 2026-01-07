'use client';
import { useState, useEffect } from 'react';
import CustomLoader from '../components/CustomLoader';

function MyPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return <CustomLoader logoSrc="/holmac_circle.png" />;
  }

  return <div>Your content here</div>;
}

export default MyPage;