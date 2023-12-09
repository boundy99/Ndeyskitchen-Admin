import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderView() {
  const { id } = useParams();
  return <div>This is the id {id}</div>;
}
