function ErrorSpecific({ message }) {
  return (
    <div className="mx-auto max-w-3xl p-4 text-center">
      <h1 className="p-2 text-3xl text-slate-800">{message}</h1>
      <h2 className="p-2 text-xl text-slate-800">
        An error has occured, please come back and try again later.
      </h2>
    </div>
  );
}

export default ErrorSpecific;
