import * as services from '../store/useSessionToken';
import { useEffect, useState } from 'react';
import { getTokenAge } from '../utils/getTokenAge';

export default function SessionToken() {
  const [ageSeconds, setAgeSeconds] = useState(0);
  const token = services.useToken();
  const createdAt = services.useCreatedAt();

  useEffect(() => {
    if (!token) {
      services.generateToken();
    }
  }, [token]);

  useEffect(() => {
    if (!createdAt) return;

    const interval = setInterval(() => {
      const age = getTokenAge(createdAt);
      setAgeSeconds(age);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <div
      className="flex
        flex-col
        bg-gray-800
        rounded-lg
        shadow-md
        p-4
        gap-y-2
      "
    >
      <h2 className="text-lg font-bold mb-2">Session Token</h2>
      <p
        className=" truncate"
        title={token ? token : ''}
      >
        <strong>Token: </strong>
        {token}
      </p>
      <p>
        <strong>Created At: </strong>
        {createdAt ? new Date(createdAt).toLocaleString() : '—'}
      </p>
      <p>
        <strong>Age: </strong>
        {ageSeconds} seconds
      </p>
    </div>
  );
}
