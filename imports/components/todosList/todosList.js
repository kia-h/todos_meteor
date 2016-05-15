
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js'

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks(){
        return Tasks.find({});
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
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: [ '$scope', TodosListCtrl ]
  });

