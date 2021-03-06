import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();
    delete task.user;

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
    const { status, searchTerm } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id})

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