import Header2 from '../components/Header2.js';
import Footer from '../components/footer.js';

const LoginPage = () => {
  return `
    ${Header2()}
    <div class="bg-gray-100 flex flex-col justify-start items-center pt-20 px-4 pb-20">
      <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <div class="flex flex-col items-center mb-6">
          <img src="assets/logo3.png" alt="Logo" class="w-20 mb-2" />
          <h2 class="text-xl font-semibold text-gray-800">DermaScan Login</h2>
        </div>
        <form id="login-form">
          <div class="mb-4 text-left">
            <label for="email-input" class="block text-sm font-medium text-gray-700 ">Email</label>
            <input type="email" id="email-input" name="email" placeholder="you@email.com"
              class="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm focus:ring focus:ring-indigo-200" required />
          </div>
          <div class="mb-2 text-left">
            <label for="password-input" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password-input" name="password" placeholder="********"
              class="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm focus:ring focus:ring-indigo-200" required />
          </div>
          <button type="submit"
            id="login-page-btn"
            class="w-full text-white py-2 rounded-md hover:bg-gray-700 transition">Login</button>
        </form>
        <p class="mt-9 text-sm text-center text-gray-500">New to DermaScan?
          <a href="#/register" class="text-gray-800 font-medium hover:underline">Register</a>
        </p>
      </div>
    </div>
    ${Footer()}
  `;
};

export const setupLoginForm = () => {
  if (location.hash === "#/login") {
    const form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;

        if (email && password) {
          try {
            // Kirim permintaan login ke backend
            const loginResponse = await fetch("http://localhost:9001/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            if (!loginResponse.ok) {
              throw new Error("Login failed. Please check your credentials.");
            }

            // Ambil token dari respons backend
            const { token } = await loginResponse.json();

            // Simpan token di localStorage
            localStorage.setItem("authToken", token);
            console.log("Token disimpan:", token); // Debugging log

            // Redirect ke halaman utama setelah login berhasil
            alert("Login berhasil!");
            window.location.hash = "/";
          } catch (err) {
            console.error(err.message);
            alert("Login gagal. Silakan periksa email dan password Anda.");
          }
        } else {
          alert("Email dan password harus diisi.");
        }
      });
    }
  }
};

export default LoginPage;
