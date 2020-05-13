import React from 'react';
import { useParams } from 'react-router-dom';
import StudentBody from './StudentBody';

export default function StudentProfile() {
  const { id } = useParams();
  return (
    <div>
      <StudentBody studentProfileId={id} />
    </div>
  );
}
