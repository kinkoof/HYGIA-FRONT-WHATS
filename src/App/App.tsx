import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { AddProducts } from "./pages/Profile/addProducts";
import PrivateRoute from "./shared/PrivateRoute";
import { EditProfile } from "./pages/Profile/editProfile";
import { ProductList } from "./pages/Profile/listProducts";
import { EditProduct } from "./pages/Profile/editProduts";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rotas públicas */}
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/add"
          element={
            <PrivateRoute>
              <AddProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/products/edit/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;