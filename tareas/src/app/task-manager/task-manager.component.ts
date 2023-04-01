import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

interface Task {
  _id: any;
    descripcion: string;
  completada: boolean;
}

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent {
  // private apiUrl = 'http://localhost:3000/tasks';
  tasks: Array<Task> = [];
  newTask: Task = { _id: '', descripcion: '', completada: false };

    constructor(private http: HttpClient) {}

    apiUrl: any = GlobalConstants.apiURL;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Array<Task>>('task')
      .subscribe(tasks => this.apiUrl = tasks);
  }

  addTask() {
    if (this.newTask.descripcion) {
      this.http.post<Task>('task', this.newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.newTask = { _id: '', descripcion: '', completada: false };
        });
    }
  }

  updateTask(task: Task) {
    this.http.put(`task${task._id}`, task)
      .subscribe(() => {
        const index = this.tasks.findIndex(t => t._id === task._id);
        this.tasks[index] = task;
      });
  }

  deleteTask(task: Task) {
    this.http.delete(`task ${task._id}`)
      .subscribe(() => {
        const index = this.tasks.findIndex(t => t._id === task._id);
        this.tasks.splice(index, 1);
      });
  }
}