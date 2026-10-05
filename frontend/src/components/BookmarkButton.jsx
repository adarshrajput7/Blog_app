import { FaRegBookmark } from 'react-icons/fa'
import { Button } from './ui/button'
import { toast } from 'react-toastify'

const BookmarkButton = ({ selectedBlog }) => {
    console.log("🚀 ~ BookmarkButton ~ selectedBlog:", selectedBlog)

    
    
    return (
        <>
            <Button onClick={()=>toast.success("BookMark Done")} variant="none">
                <FaRegBookmark />
            </Button>
        </>
    )
}

export default BookmarkButton