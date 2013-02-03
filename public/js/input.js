$("#channel").focus();

(function ($) {
  
  Input = Backbone.Model.extend({
    //Create a model to hold input atribute
    channel: null,
    name: null,
    mic: null,
    provided: null,
    stand: null,
  });
  
  InputList = Backbone.Collection.extend({
    //This is our InputList collection and holds our Input models
    initialize: function (models, options) {
      this.bind("add", options.view.addInputTr);
      //Listen for new additions to the collection and call a view function if so
    }
  });
  
  AppView = Backbone.View.extend({
		    
    el: $("body"),
        
    initialize: function () {
      this.input_list = new InputList( null, { view: this });
      //Create a input_list collection when the view is initialized.
      //Pass it a reference to this view to create a connection between the two
    },
        
    events: {
      "click #add-input":  "createInput",
      "keypress"        :  "createOnEnter"
    },
        
    createInput: function () {
      var input_channel   = $("#channel").val();
      var input_name      = $("#name").val();
      var input_mic       = $("#mic").val();
      var input_provided  = $("#provided").is(":checked");
      var input_stand     = $("#stand").val();
      var provided_string = this.displayBoolean(input_provided);
          
      var input_model   = new Input({ channel:     input_channel , 
                                      name:        input_name, 
                                      mic:         input_mic,
                                      provided:    provided_string,
                                      stand:       input_stand, });
                                          
        //Add a new input model to our input collection
      this.input_list.add( input_model );
          
      // Extract this:
      $(".field").val("");
      $("#provided").attr("checked", false);
      $("#channel").focus();
    },

    createOnEnter: function (event) {
      if ( event.which == 13 ) {
        this.createInput();
      }
    },
    
    addInputTr: function (model) {
      //The parameter passed is a reference to the model that was added
      $("#input-list").append("<tr class='input'></tr>");
      $("#input-list tr:last").append("<td>" + model.get('channel') + "</td>");
      $("#input-list tr:last").append("<td>" + model.get('name') + "</td>");
      $("#input-list tr:last").append("<td>" + model.get('mic') + model.get('provided') + "</td>");
      $("#input-list tr:last").append("<td>" + model.get('stand') + "</td>");
      //Use .get to receive attributes of the model
    },
    displayBoolean: function(param) {
      if (param === true){
        return "*"
      }
      else {
        return " "
      }
    }
  });
  
  var appview = new AppView;
})($);

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38110744-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
