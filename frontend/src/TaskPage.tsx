import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom"
import BlankSlate from "./BlankSlate"
import { Task, trabalhandoService } from "./services/trabalhando-service"
import Button from "./ui/Button"
import WorkSpanCard from "./WorkSpanCard"

function TaskPage() {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    trabalhandoService.getTaskById(Number(id))
      .then(t => setTask(t))
  }, [])

  return (
    <div className="p-8">
      {task !== null &&
        <div className="w-full border rounded-lg space-y-2 p-4">
          <h1 className="text-4xl font-bold">{task.name}</h1>
          <div className="space-x-2">
            <label className="text-xl" htmlFor="status-select">
              Status
            </label>
            {/* TODO: use "value" instead of "selected" */}
            <select name="status-select">
              <option selected={task.status == "todo"}>TODO</option>
              <option selected={task.status == "doing"}>DOING</option>
              <option selected={task.status == "done"}>DONE</option>
            </select>
          </div>
          <hr className="my-2" />
          <div className="flex">
            <div className="w-1/2 flex flex-col items-start">
              <article className="prose grow">
                <ReactMarkdown>
                  {task.description}
                </ReactMarkdown>
              </article>
              <Button text="Save" classes="border border-black hover:bg-gray-200" />
            </div>
            <div className="w-1/2">
              <h2 className="text-2xl font-bold mb-2">Work Spans</h2>
              <div className="space-y-2">
                {task.work_spans != null && task.work_spans.length > 0 ? task.work_spans.map(span => (
                  <WorkSpanCard key={span.id} workSpan={span} />
                )) : <BlankSlate />}
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default TaskPage;