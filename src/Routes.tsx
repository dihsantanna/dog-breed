import { Navigate, Route, Routes as SwitchRoutes } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';

export function Routes() {
  return <SwitchRoutes>
    <Route path="/" element={<Navigate to="register" replace={true} />} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/list" element={<ListPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </SwitchRoutes>;
}
