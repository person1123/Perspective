import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  summary: DS.attr('string'),
  topic_id: DS.belongsTo('topic')
});
