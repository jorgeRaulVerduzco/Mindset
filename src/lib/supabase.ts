import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://iolidzjmllhbqetxxqcr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbGlkemptbGxoYnFldHh4cWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzEwNDIsImV4cCI6MjA5NDQ0NzA0Mn0.Wow_Qg5Tfqtk8mHCjtdVlgPBUfWnQM9KIiGLl99rELA'
)
