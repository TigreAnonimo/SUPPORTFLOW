import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";
import TicketDetail from "../pages/TicketDetail";
import MainLayout from "../layout/MainLayout";
import NewTicket from "../pages/NewTicket";
import EditTicket from "../pages/EditTicket";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />

        {/* Rutas privadas */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/new" element={<NewTicket />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/tickets/edit/:id" element={<EditTicket />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
