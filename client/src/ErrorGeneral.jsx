import { Link } from "react-router-dom";

function ErrorGeneral() {
  return (
    <div className="mx-auto max-w-3xl p-4 text-center">
      <h1 className="p-2 text-3xl text-slate-800">Page Not Found</h1>
      <h2 className="p-2 text-xl text-slate-800">
        Sorry, but we could not find the page you are looking for.
      </h2>
      <Link to="/">
        <button className="mt-4 rounded-2xl bg-green-800 p-3 text-white shadow transition-all duration-100 hover:ring-2 hover:ring-emerald-600 active:bg-green-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default ErrorGeneral;
