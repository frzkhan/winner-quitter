'use strict';

module.exports = function(Task) {
  Task.submissions = async (taskId) => {
    const task = await Task.findById(taskId, {
      include: {
        relation: "submissions",
        scope: {
          include: {
            relation: "user",
            scope: {
              include: "profile"
            }
          }
        }
      }
    })
    return task
  }
};
