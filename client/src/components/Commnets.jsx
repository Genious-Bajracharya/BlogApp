import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function Comments() {
  const queryClient = useQueryClient();
  const { id: blogId } = useParams();
  const [editComment, setEditComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const email='ikki@gmail.com'
  const name='Kurogane'

  // Fetch comments
  const { isLoading, error, data: comments } = useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => axios.get(`http://localhost:5050/api/comment?blogId=${blogId}`).then((res) => res.data),
  });

  //  updating comments
  const updateCommentMutation = useMutation({
    mutationFn: ({ id, updatedComment }) => axios.put(`http://localhost:5050/api/comment/${id}`, updatedComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
      toast.success('Comment updated successfully');
      setEditingCommentId(null);  
      setEditComment('');         
    },
    onError: (error) => {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
    const commentToEdit = comments.find((comment) => comment._id === commentId);
    setEditComment(commentToEdit.comment);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateCommentMutation.mutate({ id: editingCommentId, updatedComment: { email, name, comment: editComment, blogId } });
  };


  //  deleting comments
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => axios.delete(`http://localhost:5050/api/comment/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
      toast.success('Comment deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleDelete = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
  {comments.map((comment) => (
    <div key={comment._id} className="flex mb-4">
      <div className="flex-grow">
        <div className="font-semibold">{comment.name}</div>
        <div>{comment.comment}</div>
      </div>
      <div className="flex space-x-4">
        {editingCommentId === comment._id && (
          <form onSubmit={handleUpdate} className="flex items-center">
            <input
              className="border border-gray-300 rounded px-2 py-1"
              placeholder="Edit Comment..."
              required
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        )}
        <button
          onClick={() => handleEdit(comment._id)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(comment._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
  );
}
