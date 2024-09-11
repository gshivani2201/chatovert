import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { userExists, userNotExists } from "./redux/reducers/auth";
import { server } from "./constants/config";

// child components
import ProtectRoute from "./components/auth/ProtectRoute";
import Loader from "./components/Layout/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((error) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/users-management" element={<UserManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
