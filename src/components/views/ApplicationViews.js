import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { EventList } from "../event/EventList";
import { EventForm } from "../event/EventForm";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<EventList />} />
        <Route path="/eventForm" element={<EventForm />} />
        <Route path="/events/edit/:event_id" element={<EventForm />} />
      </Route>
    </Routes>
  );
};
