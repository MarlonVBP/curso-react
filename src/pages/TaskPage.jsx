import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "Default Title";
  const description = searchParams.get("description") || "Default Description";
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] h-fit bg-slate-200 p-6 rounded-md shadow space-y-4">
        <h1 className="text-slate-800 text-3xl font-bold text-center">
          {title}
        </h1>
        <div className="p-6 bg-slate-400 rounded-md shadow">
          <p className="text-slate-100 font-semibold">{description}</p>
        </div>
        <div className="flex justify-between">
         <button 
         onClick={
          () => {
            navigate("/")
         }}
         className="flex"><ArrowLeft /> Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
