$("#channel").focus();

(function ($) {

  Input = Backbone.Model.extend({
    channel: null,
    name: null,
    mic: null,
    provided: null,
    stand: null,
  });

  InputList = Backbone.Collection.extend({
    initialize: function (models, options) {
      this.bind("add", options.view.addInputTr);
    }
  });

  AppView = Backbone.View.extend({

    el: $("body"),

    initialize: function () {
      this.input_list = new InputList( null, { view: this });
    },

    events: {
      "submit form"    :  "createInput"
    },

    createInput: function (event) {
      event.preventDefault();
      var input_channel   = $("#channel").val();
      var input_name      = $("#name").val();
      var input_mic       = $("#mic").val();
      var input_provided  = $("#provided").is(":checked");
      var input_stand     = $("#stand").val();
      var provided_string = this.displayBoolean(input_provided);
          
      var input_model = new Input({ channel:     input_channel , 
                                    name:        input_name, 
                                    mic:         input_mic,
                                    provided:    provided_string,
                                    stand:       input_stand, });

      this.input_list.add( input_model );

      // TODO: Extract this:
      $(".field").val("");
      $("#provided").attr("checked", false);
      $("#channel").focus();
    },

    addInputTr: function (model) {
      $("#input-list tbody").append("<tr class='input'></tr>");
      $("#input-list tr:last").append("<td>" + model.get('channel') + "</td>");
      $("#input-list tr:last").append("<td><strong>" + model.get('name') + "</strong></td>");
      $("#input-list tr:last").append("<td>" + model.get('mic') + model.get('provided') + "</td>");
      $("#input-list tr:last").append("<td>" + model.get('stand') + "</td>");
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

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38110744-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
