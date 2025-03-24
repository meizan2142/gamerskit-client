const NewsLetter = () => {
    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Newsletter Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Subscribe To Our Newsletter</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sceberisque duis ultrices sollicitudin aliquam sem. Sediorisque duis ultrices sollicitudin.
                    </p>
                    <div className="mt-8">
                        <input
                            type="email"
                            placeholder="michael@ymail.com"
                            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="mt-4 sm:mt-0 sm:ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            Subscribe Now
                        </button>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">FASCO</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Support Center</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Invoicing</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Contract</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Careers</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 text-center text-gray-600">
                    <p>Copyright © 2022 2pp. All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter