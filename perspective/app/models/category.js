import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  topicId: DS.belongsTo('topic'),
  articles: DS.hasMany('article')
});
