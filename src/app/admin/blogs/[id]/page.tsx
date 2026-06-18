import BlogForm from '@/components/Admin/BlogForm'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!blog) {
    notFound()
  }

  return <BlogForm initialData={blog} blogId={blog.id} />
}
