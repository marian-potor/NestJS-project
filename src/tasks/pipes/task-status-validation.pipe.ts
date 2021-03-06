import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.INPROGRESS,
    TaskStatus.DONE
  ];

  transform (value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException;
    }
    return value
  }

  private isStatusValid(status: any): boolean {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}