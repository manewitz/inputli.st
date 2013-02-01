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