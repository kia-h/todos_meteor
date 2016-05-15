
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js'

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks(){
        //shows newest tasks at the top
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    })
  }
  addTask(newTask) {
    //insert a ntask into collection
    Tasks.insert({
      text: newTask,
      createdAt: new Date()
    });
    //clear the form
    this.newTask = '';
  }

  setChecked(task) {
    //set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked 
      },
    });
  }
  removeTask(task) {
    Tasks.remove(task._id);
  }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: [ '$scope', TodosListCtrl ]
  });

