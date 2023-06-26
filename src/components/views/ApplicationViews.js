import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { EventList } from "../event/EventList";
import { EventForm } from "../event/EventForm";
import { Guide } from "../Users/Guide";
import { HomePage } from "../HomePage";
import { MyEvents } from "../event/MyEvents";
import { EventDetail } from "../event/EventDetail";
import { Profile } from "../Users/Profile";
import { LoginPage } from "../auth/LoginPage";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/guides/:guide_id" element={<Guide />} />
      <Route path="/eventDetails/:event_id" element={<EventDetail />} />
      <Route element={<Authorized />}>
        <Route path="/events/edit/:event_id" element={<EventForm />} />
        <Route path="/eventForm" element={<EventForm />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/dashboard" element={<Profile />} />
      </Route>
    </Routes>
  );
};
