import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="mb-1 bg-green-800 p-5 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold">CrudBlog</h1>
        <nav className="flex space-x-8">
          <Link
            to="/"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="create"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            Write a Blog Post
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
