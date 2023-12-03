import { ChangeEvent, FormEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { loginFetch } from "../utils/fetch";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginFetch({ name, password })
      .then((data) => {
        if (data.nation) {
          //mettre à jour le state global
          localStorage.setItem("jwt", data.jwt);
          console.log(data.nation);

          // navigate("/dashboard");
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div className="relative">
          <input
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nom de la nation"
            value={name}
          />
        </div>
        <div className="relative">
          <input
            onChange={handleChange}
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Clé"
            value={password}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <a className="underline" href="/register">
              Sign up
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </section>
  );
}
