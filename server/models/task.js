// Expert = completed tasks count + worker rating
// Reliability = ( delivered tasks count / total submissions ) * 100
// Interest = (Similar delivered tasks count / Similar submissions count) * 100
// Availability = (completed tasks count / (canceled tasks count + completed tasks count)) * 100

module.exports = function(Task) {
  Task.submissions = async (taskId) => {
    const task = await Task.findById(taskId, {
      include: {
        relation: 'submissions',
        scope: {
          include: {
            relation: 'user',
            scope: {
              include: ['profile', {
                relation: 'submissions',
                scope: {
                  include: 'task'
                }
              }]
            }
          }
        }
      }
    })

    const taskSkills = (task.skills || '').split(',').map(s => s.trim())
    
    task.submissions().forEach(submission => {
      const profile = submission.user().profile()
      const allSubmissions = submission.user().submissions()
      const expert = (profile.completedCount + profile.averageRating || 0).toFixed(2)
      const reliability = ((profile.deliveredCount / profile.submissionsCount) * 100 || 0).toFixed(2)
      const availability = ((profile.completedCount / (profile.canceledCount + profile.completedCount)) * 100 || 0).toFixed(2)
      const similarDeliveredCount = allSubmissions.filter(s => s.delivered && skillsToArray(s.task().skills).length).length
      const similarSubmissionsCount = allSubmissions.filter(s => skillsToArray(s.task().skills).length).length
      const interest = ((similarDeliveredCount / similarSubmissionsCount) * 100 || 0).toFixed(2)

      submission.metrics = {
        expert,
        reliability,
        interest,
        availability,
        similarDeliveredCount,
        similarSubmissionsCount
      }
      
    });
    return task
  }
  function skillsToArray(skills) {
    return skills.split(',').map(s => s.trim())
  }
};
