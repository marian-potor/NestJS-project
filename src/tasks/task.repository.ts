import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    const { status, searchTerm } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (searchTerm) {
      query.andWhere('task.title LIKE :searchTerm OR task.description LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    }

    const result = await query.getMany();
    return result;
  }
}