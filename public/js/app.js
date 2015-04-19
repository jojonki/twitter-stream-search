 (function() {
  var Tweet = Backbone.Model.extend({
    defaults: {
      'tweet': 'hoge',
      'user': 'fuga',
      'date': 'time'
    }
  });

  var Tweets = Backbone.Collection.extend({
    model: Tweet
  });

  var TweetView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.model.on('destroy', this.destroy, this);
    },
    template: _.template($('#tweet-template').html()),
    destroy: function() {
      // if(confirm('are you sure')) {
      // this.model.destroy();
      this.$el.remove();
      // }
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  var TweetsView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
      this.collection.on('add', this.addNew, this);
      this.collection.on('change', this.updateCount, this);
      this.collection.on('destroy', this.updateCount, this);
    },
    addNew: function(tweet) {
      this.updateCount();
      if(this.collection.models.length > 13) {
        // console.log(this.collection.models[0]);
        this.collection.models[0].destroy();
      }
      var tweetView = new TweetView({model: tweet});
      this.$el.prepend(tweetView.render().el);
      // $('#title').val('').focus();
      // this.updateCount();
    },
    updateCount: function() {
      $('#search-result-count').html(this.collection.length);

    },
    destroy: function() {
      console.log('destroy in TweetsView');
    },
    render: function() {
      this.collection.each(function(tweet) {
        var tweetView = new TweetView({model: tweet});
        this.$el.append(tweetView.render().el);
      }.bind(this));
      return this;
    }
  });

  var SearchView = Backbone.View.extend({
    el: '#search-form',
    events: {
      'submit': 'submit'
    },
    submit: function(e) {
      e.preventDefault();
      var key = $('#search-key').val();
      console.log(key);
      $.get('search/' + key, 
        function(data) {
          console.log('response', data);
        }
      );

      // var task = new Task({title: $('#title').val()});
      // var task = new Task();
      // if(task.set({title: $('#title').val()}, {validate: true})) {
      //   this.collection.add(task);
      //   $('#error').empty();
      // }
    }
  });

  var tweets = new Tweets([
      {'tweet': 'sample tweet1'},
  ]);

  // var view = new TweetView({model: tweet});
  var searchView = new SearchView({collection: tweets});
  var tweetsView = new TweetsView({collection: tweets});
  $('#search-result').html(tweetsView.render().el);

  var socket = io.connect();
  // $('form').submit(function() {
  //   socket.emit('msg', $('input').val());
  //   return false;
  // });

  socket.on('msg', function(data) {
    var tweet = new Tweet();
    if(tweet.set({name: data.name, tweet: data.tweet}, {validate: true})) {
      tweets.add(tweet);
    }
  });
 })();
