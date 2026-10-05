import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import BlogCard from "./BlogCard"

const SearchList = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get('q')
    const { blog, loading } = useSelector((state) => state.blog)
    
    
    const searchQuery = query?.toLowerCase().trim() || ''

    const filteredBlogs = searchQuery ? blog.filter((blogItem) => {
        const title = (blogItem.title || '').toLowerCase()
        const subtitle = (blogItem.subtitle || '').toLowerCase()
        const category = (blogItem.category || '').toLowerCase()
        const content = (blogItem.content || '').toLowerCase()

        return title.includes(searchQuery) ||
            subtitle.includes(searchQuery) ||
            category.includes(searchQuery) ||
            content.includes(searchQuery)
    }) : []

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

   
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading search results...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-2">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 dark:bg-gray-900">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Search Results for: <span className="text-blue-600">"{query || ''}"</span>
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Found {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center dark:bg-gray-900">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2 dark:text-gray-50">
                            No results found
                        </h3>
                        <p className="text-gray-600 mb-6 dark:text-gray-400">
                            We couldn't find any blogs matching "{query}"
                        </p>
                        <Link 
                            to="/" 
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse All Blogs
                        </Link>
                    </div>
                ) : (
                    // ✅ Grid layout for results
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blogItem) => (
                            <BlogCard key={blogItem._id} blog={blogItem} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchList