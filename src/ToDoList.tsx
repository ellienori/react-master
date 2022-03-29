import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onValid = (data:any) => {
    console.log(data.toDo);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid,)}>
        <input {...register("toDo", {
          required: "To Do is required",
          minLength: {
            value: 5,
            message: "You to do is too short."
        }})} placeholder="Write a to do" />
        <span>
          {errors?.toDo?.message}
        </span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;