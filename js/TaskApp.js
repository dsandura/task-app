var TaskApp = function TaskApp () {
  var // listOfLists = ListOfLists(),
    taskListUI = TaskListUI(),
    that = {
	
	init: function init(taskList) {
	    // load task lists on page
	    $( document ).on("pagecreate", "#task-page", function () {
		taskListUI.loadTaskList(taskList);
	    });
	}
    };

    return that;
}

var TaskListUI = function TaskListUI () {
    var taskList;

    var  addTask = function addTask (task) {
	var taskId = taskList.add(task);
        displayTask(task, taskId);
    },

    displayTask = function displayTask (task, taskId) {
        $('#task-list').append(
                  [
                      '<li id="', taskId, '">',
                      '<a href="#">',
                      task.name,
                      '<br/>',
                      task.details,
                      '</a>',
                      '<a href="#" class="delete">',
                      'Delete',
                      '</a>',
                    '</li>'
                  ].join('')
        );
        $('#' + taskId + ' .delete').on( "click", function () {
            removeTask($(this).parent('li'));
        });
        $('#task-list').listview('refresh');
    },

    removeTask = function removeTask (taskItem) {
        var taskId = taskItem.attr("id");
                
        if (taskList.remove(taskId)) {
            taskItem.remove();
            $('#task-list').listview('refresh');
        }
    },

    loadTaskList(newTaskList) {
	taskList = newTaskList;
          
	$("form :input").on("keypress", function(e) {
            return e.keyCode != 13;
	});

	taskList.forEach(displayTask);

	$( '#add' ).on("click", function () {
            var taskname = $('#taskname').val(),
            taskdetails = $('#taskdetails').val();
            addTask({ name: taskname, details: taskdetails });
            $( '#taskname' ).val('');
            $( '#taskdetails' ).val('');
	});
    }
});
        
