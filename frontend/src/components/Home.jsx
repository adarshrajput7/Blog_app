import Hero from "./Hero"
import PopularAuthor from "./PopularAuthor"
import RecentBlog from "./RecentBlog"


const Home = () => {
  return (
    <div className="overflow-y-auto">
      <Hero/>
      <RecentBlog />
      <PopularAuthor/>
    </div>
  )
}

export default Home
