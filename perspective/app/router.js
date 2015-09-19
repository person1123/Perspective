import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('topic', function() {
    this.route('show', {
      path: ':topic_id'
    });
  });
});

export default Router;
