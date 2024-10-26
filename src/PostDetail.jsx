import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutaion }) {
  // replace array data with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comment", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 4000,
  });
  if (isLoading) return <h3>Loading .... </h3>;
  if (isError) return <h3>{error.toString()}</h3>;
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutaion.mutate(post.id)}>Delete</button>
        {deleteMutaion.isPending && (
          <p className="loading">Deleting the Post</p>
        )}
        {deleteMutaion.isError && (
          <p className="error">
            Error deleting the post :{deleteMutaion.error.toString()}
          </p>
        )}
        {deleteMutaion.isSuccess&&<p className='success' >
          Post was (not) deleted</p>}
      </div>
      <div>
        <button>Update title</button>
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
