
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js'

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.hideCompleted = false;

    this.helpers({
      tasks(){
        const selector ={};

        //if hide completed is checked, filter tasks
        if(this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        //show newset tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount(){
        return Tasks.find({
          checked:{
            $ne: true
          }
        }).count();
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

