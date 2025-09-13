import { supabase } from "services/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from('todos')
    .select()
    .order('id');

  if (error) {
    console.error('Error fetching todos:', error);
    return new Response('Error fetching todos', { status: 500, });
  }

  return Response.json({ data });
}

export async function POST(request: Request) {
  const { task } = await request.json();

  const { data, error } = await supabase
    .from('todos')
    .insert({ task, is_complete: false } as never)
    .select()
    .single();

  if (error) {
    console.error('Error adding todo:', error);
    return new Response('Error adding todo', { status: 500, });
  }

  return Response.json({ data });
}

export async function PUT(request: Request) {
  const { id, task, is_complete } = await request.json();

  const { data, error } = await supabase
    .from('todos')
    .update({ task, is_complete } as never)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    return new Response('Error updating todo', { status: 500, });
  }

  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting todo:', error);
    return new Response('Error deleting todo', { status: 500, });
  }

  return Response.json({ data });
}
