window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
		$(this.el).append("hello world");
        return this;
    },
	unrender: function(){
		$(this.el).remove();
	}
});

window.Page1View = Backbone.View.extend({

    template:_.template($('#page1').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
		$(this.el).append("hello world");
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "page1":"page1",
        "page2":"page2"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    page1:function () {
        console.log('#page1');
        this.changePage(new Page1View());
    },

    page2:function () {
        console.log('#page2');
        this.changePage(new Page2View());
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});
//--------------------------------------------------------------------

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