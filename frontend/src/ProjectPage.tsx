import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { FaCog } from 'react-icons/fa'
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectBoard from "./ProjectBoard";
import { Project, trabalhandoService } from "./services/trabalhando-service";
import { Breadcrumb, BreadcrumbHome, BreadcrumbItem } from "./ui/Breadcrumb";
import Button from "./ui/Button";

function ProjectPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    trabalhandoService.getProjectById(projectId!)
      .then(p => setProject(p))
  }, [])

  return (
    <div>
      {project !== null &&
        <div className="p-4 space-y-4">
          <Breadcrumb>
            <BreadcrumbHome />
            <BsChevronRight />
            <BreadcrumbItem>
              <span>{project.name}</span>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* TODO: don't use project card component here 
            this will show different information (such as an options edit button, etc)
            and should not try to use or modify the existing project card
          */}
          <div className="w-full px-8 py-4 space-y-2 border rounded-lg bg-white">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <Link to={`/projects/${projectId}/details`} className="p-2 rounded-full border hover:bg-gray-200">
                <FaCog className="text-gray-700" />
              </Link>
            </div>
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="text-lg">2 tasks pending</p>
                <p className="text-lg">9 tasks in progress</p>
              </div>
              <h2 className="text-xl font-bold">10 hours last 2 weeks</h2>
            </div>
          </div>
          <Button text="Create new task" classes="border border-black hover:bg-gray-200" onClick={() => navigate(`/projects/${projectId}/tasks/new`)} />
          <ProjectBoard />
        </div>
      }
    </div>
  )
}

export default ProjectPage
