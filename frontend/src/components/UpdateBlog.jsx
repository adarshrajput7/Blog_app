import JoditEditor from 'jodit-react';
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useRef, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setBlog, setLoading } from '@/redux/blogSlice';
import { Loader2 } from 'lucide-react';



const UpdateBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState()
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.blogId
    const { blog, loading } = useSelector(store => store.blog)
    const selectBlog = blog.find(blog => blog._id === id)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')
    const [blogData, setBlogData] = useState({
        title: selectBlog?.title,
        subtitle: selectBlog?.subtitle,
        description: content,
        category: selectBlog?.category
    })

    const eventChangeHandle = (e) => {
        const { name, value } = e.target
        setBlogData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const selectCategogy = (value) => {
        setBlogData({ ...blogData, category: value })
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            // Preview URL create karo
            const previewUrl = URL.createObjectURL(selectedFile)
            setPreview(previewUrl)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', blogData.title)
        formData.append('subtitle', blogData.subtitle)
        formData.append('description', content)
        formData.append('category', blogData.category)
        formData.append('file', file)


        try {
            dispatch(setLoading(true))
            const res = await axios.put(`http://localhost:8000/api/v1/blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, withCredentials: true
            })
            if (res.data.success) {
                // dispatch(setBlog(res.data.blog))
                dispatch(
                    setBlog(blog.map((item) => item._id === id ? res.data.blog : item))
                );
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('blog update frontend', error)
        } finally { dispatch(setLoading(false)) }
    }



    return (
        <div className=" px-3 h-screen w-[calc(85vw-72px)] overflow-y-auto pb-50">
            <div className="w- mx-auto m-2">
                <Card className='w-full dark:bg-gray-900 p-5 space-y-1'>
                    <h1>Basic Blog Information</h1>
                    <p>Makes changes to your blog here. Click publish when you are done</p>
                    <div className="space-x-2">
                        <Button>Publish</Button>
                        <Button variant="destructive">Remove blog</Button>
                    </div>
                    <div>
                        <Label>Title</Label>
                        <Input type='text' placeholder='Enter a title' name='title'
                            className='border-2 border-gray-500 mt-2'
                            value={blogData.title} onChange={eventChangeHandle} />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input type='text' placeholder='Enter a title' name='subtitle'
                            className='border-2 border-gray-500 mt-2'
                            value={blogData.subtitle} onChange={eventChangeHandle}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <JoditEditor
                            ref={editor}
                            className='mt-2 border-2 border-gray-500'
                            value={content}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                    <div>
                        <Label className='mb-2'>Category</Label>
                        <Select onValueChange={selectCategogy}>
                            <SelectTrigger className="w-full max-w-48 border-2 border-gray-500 rounded-lg">
                                <SelectValue placeholder='Select a category' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel> Category</SelectLabel>
                                    <SelectItem value='web devloper'>Web Devloper</SelectItem>

                                    <SelectItem value='Digital Marketing'>Digital Marketing</SelectItem>

                                    <SelectItem value='Blogging'>Blogging</SelectItem>

                                    <SelectItem value='Photography'>Photography</SelectItem>

                                    <SelectItem value='Cricket'>Cricket</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Thumbnail</Label>
                        <Input type='file' placeholder='Choose a Thumbnail'
                            className='border-2 border-gray-500 mt-2 w-80'
                            // onChange={(e) => setFile(e.target.files[0])}
                            onChange={handleFileChange}
                        />
                        {/* ✅ Image Preview -  */}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300 mt-2"
                            />
                        )}
                    </div>
                    <div>
                        <Button variant='outline'>Back</Button>
                        <Button onClick={submitHandler}>{
                            loading ? <><Loader2 className='w-4 h-4 animate-spin' /></> : "Save"
                        }</Button>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default UpdateBlog


