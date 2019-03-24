const app = require('../server')
module.exports = function (Profile) {
  setTimeout(function () {
    app.models.User.hasOne(Profile, {
      foreignKey: 'userId',
      as: 'profile'
    })
    app.models.User.hasMany(Profile.app.models.Submission, {
      foreignKey: 'userId',
      as: 'submissions'
    })

    app.models.User.observe('after save', async function(ctx, next) {
      if (ctx.instance) {
        await Profile.create({
          userId: ctx.instance.id
        })
        next();
      }
    });
  }, 100);
}
