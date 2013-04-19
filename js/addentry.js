(function($){

  Backbone.sync = function(method, model, success, error){ 
    success();
  }
  
  var Item = Backbone.Model.extend({
    defaults: {
      //part1: 'hello'
	  part1: document.getElementById("textarea1").value
    }
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li', // name of tag to be created        
    // `ItemView`s now respond to two clickable actions for each `Item`: swap and delete.
    events: { 
      'click span.delete': 'remove'
    },    
    // `initialize()` now binds model change/removal to the corresponding handlers below.
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('part1')+'</span> &nbsp; &nbsp; <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; // for chainable calls, like .render().el
    },
    // `unrender()`: Makes Model remove itself from the DOM.
    unrender: function(){
      $(this.el).remove();
    },
    // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
    remove: function(){
      this.model.destroy();
    }
  });

	var ListView = Backbone.View.extend({
		el: $('body'), // el attaches to existing element

		events: {
			'click button#add': 'addItem'
		},
		initialize: function(){
			_.bindAll(this, 'addItem'); // every function that uses 'this' as the current object should be in here
		},

		appendItem: function(item){
		  var itemView = new ItemView({
			model: item
		  });
		  $('ul', this.el).append(itemView.render().el);
		}
  });

	var listView = new ListView();
})(jQuery);