import axios from 'axios';
import { useEffect, useState } from 'react'
const PopularAuthor = () => {

    const [user, setUser] = useState()
    console.log('lslsslssl', user);




    useEffect(() => {

        const getAllUser = async () => {
            try {
                const res = await await axios.get(`http://localhost:8000/api/v1/user/all-users`)
                if (res.data.success) {
                    setUser(res.data.users)
                }
            } catch (error) {
                console.log(error);

            }
        }

        getAllUser()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center py-6">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Popular Authors</h1>
                <hr className="w-20 h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>

            <div className="flex flex-wrap justify-center items-center  gap-20 px-4 my-5">
                {user?.slice(0, 6).map((blog, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 relative"
                    >
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"></div>

                        <img
                            src={blog.photoUrl || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff'}
                            alt={blog.fullName}
                            className="relative z-10 rounded-full h-20 w-20 md:h-28 md:w-28 object-cover border-4 border-white shadow-md group-hover:scale-110 transition duration-300"
                        />
                        <h1 className="relative z-10 text-base md:text-xl font-semibold text-gray-800 dark:text-white mt-3">
                            {blog.fullName || 'Unknown'}
                        </h1>
                    </div>
                ))}
            </div>
        </>
    )


}

export default PopularAuthor
