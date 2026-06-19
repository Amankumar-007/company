import AuthorForm from '@/components/Admin/AuthorForm'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: author } = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .single()

  if (!author) {
    notFound()
  }

  return <AuthorForm initialData={author} authorId={author.id} />
}
