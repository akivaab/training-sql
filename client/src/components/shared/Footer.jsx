import { format } from "date-fns";

function Footer() {
  return (
    <footer className="mt-6 bg-green-800 px-4 py-3 text-white">
      Copyright &copy; {format(Date.now(), "yyyy")}. All rights reserved.
    </footer>
  );
}

export default Footer;
