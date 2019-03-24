module.exports = function (Submissions) {

  Submissions.observe('after save', async function(ctx) {
    const Profile = Submissions.app.models.Profile

    if (ctx.instance) {
      const profile = await Profile.findOne({
        where: {
          userId: ctx.instance.userId
        }
      })
      const submissions = await Submissions.find({
        where: {
          userId: ctx.instance.userId
        },
        include: 'task'
      })

      profile.submissionsCount = submissions.length
      profile.selectedCount = submissions.filter(s => s.selected).length
      profile.deliveredCount = submissions.filter(s => s.delivered).length
      profile.canceledCount = submissions.filter(s => s.canceled).length
      profile.completedCount = submissions.filter(s => s.completed).length
      let totalSubmissionsRated = 0
      let totalRating = 0

      submissions.forEach(s => {
        if (s.completed) {
          totalSubmissionsRated ++
          totalRating += s.rated
        }
      })
      profile.averageRating = (totalRating/totalSubmissionsRated) || 0
      await profile.save()
    }
    return true
  })
}
