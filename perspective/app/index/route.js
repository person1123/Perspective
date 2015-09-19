import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let topics = [
      {
        id: 1,
        name: 'Presidential Race'
      },
      {
        id: 2,
        name: 'Clocks are Bombs'
      },
      {
        id: 3,
        name: 'Cat Food is Great'
      },
      {
        id: 4,
        name: 'Republicans are Vampires'
      },
      {
        id: 5,
        name: 'Cows Go Moo'
      },
      {
        id: 6,
        name: 'Haskell is a language'
      }
    ];
    for (let i = 0; i < topics.length; i++) {
      let topic = topics[i];
      this.store.createRecord('topic', topic);
    }
    return this.store.peekAll('topic');
  }
});
