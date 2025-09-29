import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy loaded pages
const EventList = React.lazy(() => import("./pages/EventList"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));
const MyBookings = React.lazy(() => import("./pages/MyBookings"));
const BookingForm = React.lazy(() => import("./pages/BookingForm"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));

// Lazy loaded components
const Navbar = React.lazy(() => import("./components/Navbar"));
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route
            path="/book/:id"
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
