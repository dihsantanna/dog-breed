import React from 'react';
import { Routes as SwitchRoutes, Route } from 'react-router-dom';

export default function Routes() {
  return <SwitchRoutes>
    <Route path="/" element={<h1>Dog Breed</h1>} />
  </SwitchRoutes>;
}
