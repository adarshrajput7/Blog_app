import { FaReact } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2">
                            <FaReact className="animate-spin" size={25} />
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Mindle<span className="text-indigo-500">Blog</span>
                            </h2>
                        </div>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                            Sharing thoughtful stories, ideas and inspiration
                            with curious minds.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Explore
                        </h3>

                        <div className="mt-4 space-y-2 text-sm text-gray-500 cursor-pointer">
                            <a href="/" className="block hover:text-gray-900 transition">
                                Home
                            </a>
                            <a onClick={() => navigate('/blogs')} className="block hover:text-gray-900 transition">
                                Latest Posts
                            </a>
                            <a onClick={() => navigate('/about')} className="block hover:text-gray-900 transition">
                                About
                            </a>
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Connect
                        </h3>

                        <div className="mt-4 space-y-2 text-sm text-gray-500">
                            <a href="http://instagram.com/theroyalrajput_7" className="block hover:text-gray-900 transition">
                                Instagram
                            </a>
                            <a href="#" className="block hover:text-gray-900 transition">
                                Twitter
                            </a>
                            <a href="#" className="block hover:text-gray-900 transition">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-400">
                    Made with <span className="text-red-500">♥</span> for curious minds.
                </div>
            </div>
        </footer>
    );
};

export default Footer;