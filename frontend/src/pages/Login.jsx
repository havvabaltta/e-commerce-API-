import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 LOGIN
      if (isLogin) {
        if (!form.username || !form.password) {
          alert("Username ve şifre zorunlu");
          return;
        }

        await login({
          username: form.username,
          password: form.password,
        });

        navigate("/profile");
      }

      // 🆕 REGISTER
      else {
        if (
          !form.username ||
          !form.email ||
          !form.password ||
          !form.password_confirm
        ) {
          alert("Lütfen tüm alanları doldur");
          return;
        }

        // 🔥 PASSWORD CHECK
        if (form.password !== form.password_confirm) {
          alert("Şifreler uyuşmuyor");
          return;
        }

        await registerUser(form);

        alert("Kayıt başarılı, şimdi giriş yap");

        // form reset
        setForm({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          password_confirm: "",
        });

        setIsLogin(true);
      }
    } catch (err) {
      console.log(err.response?.data);
      alert("Hata oluştu");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-5 mx-auto">

        {/* TAB BUTTONS */}
        <div className="d-flex mb-4">
          <button
            type="button"
            className={`btn w-50 ${isLogin ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setIsLogin(true)}
          >
            Giriş
          </button>

          <button
            type="button"
            className={`btn w-50 ${!isLogin ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setIsLogin(false)}
          >
            Kayıt Ol
          </button>
        </div>

        <h4 className="mb-3 text-center">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h4>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          {!isLogin && (
            <>
              <input
                className="form-control mb-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Ad"
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Soyad"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
              />
            </>
          )}

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Şifre"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {!isLogin && (
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Şifre Tekrar"
              value={form.password_confirm}
              onChange={(e) =>
                setForm({
                  ...form,
                  password_confirm: e.target.value,
                })
              }
            />
          )}

          <button
            type="submit"
            className={`btn w-100 ${isLogin ? "btn-dark" : "btn-success"}`}
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;