/**
 * @file redcat_customizations.js
 * 
 */
(function ($) {
/* Original Backup
  Drupal.behaviors.redcat_customizations = {
    attach: function() {
      $('#block-redcat-customizations-calendar-picker').once('redcat-customizations', function() {
        var current_date = new Date(Drupal.settings.redcat_event_default_date);
        Drupal.settings.redcat_customizations_current_date = current_date.getFullYear() +
          '-' + redcat_customizations_pad(current_date.getMonth() + 1);
        $('#redcat-event-nojs').hide();
        $('#redcat-datepicker').datepicker({
          defaultDate: Drupal.settings.redcat_event_default_date,
          monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          showOtherMonths: true,
          selectOtherMonths: true,
          onSelect: function(dateText, inst) {
            //Use date text to figure out week.
            var date = new Date(dateText);
            date.setDate(date.getDate() - date.getDay());
            var new_date_text = date.getFullYear() +
              '-' + redcat_customizations_pad(date.getMonth() + 1) +
              '-' + redcat_customizations_pad(date.getDate());
            var uri = Drupal.settings.redcat_event_base_uri + '/' + new_date_text;
            window.location = uri;
          },
          onChangeMonthYear: function(year, month, inst) {
            Drupal.settings.redcat_customizations_current_date = redcat_customizations_pad(year) +
              '-' + redcat_customizations_pad(month);
            setTimeout(redcat_customizations_update_month, 100);
          }
        });
        redcat_customizations_update_month();
      });
    }
  }
*/
/*
  Drupal.behaviors.redcat_customizations = {
    attach: function() {
      $('#block-redcat-customizations-calendar-picker').once('redcat-customizations', function() {
        var current_date = new Date(Drupal.settings.redcat_event_default_date);
        Drupal.settings.redcat_customizations_current_date = current_date.getFullYear() +
          '-' + redcat_customizations_pad(current_date.getMonth() + 1);
        $('#redcat-event-nojs').hide();
        $('#redcat-datepicker').datepicker({
          defaultDate: Drupal.settings.redcat_event_default_date,
          monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          showOtherMonths: true,
          selectOtherMonths: true,
          onSelect:           
          function(dateText, inst) {
            //Use date text to figure out week.
            var date = new Date(dateText);
            date.setDate(date.getDate());
            var new_date_text = date.getFullYear() + 
            	redcat_customizations_pad(date.getMonth() + 1) + 
            	redcat_customizations_pad(date.getDate());
            var uri = 'datepicker/' + new_date_text;
            $('#redcat-datepicker-details').load(uri+' .view-datepicker-details');
            //window.location = uri;
          },
          onChangeMonthYear: function(year, month, inst) {
            Drupal.settings.redcat_customizations_current_date = redcat_customizations_pad(year) +
              '-' + redcat_customizations_pad(month);
            setTimeout(redcat_customizations_update_month, 100);
          }
        });
        redcat_customizations_update_month();
      });
    }
  }
  // end new stuff
*/
  Drupal.behaviors.redcat_customizations = {
    attach: function() {
      $('#block-redcat-customizations-calendar-picker').once('redcat-customizations', function() {
        var current_date = new Date(Drupal.settings.redcat_event_default_date);
        Drupal.settings.redcat_customizations_current_date = current_date.getFullYear() +
          '-' + redcat_customizations_pad(current_date.getMonth() + 1);
        $('#redcat-event-nojs').hide();
        $('#redcat-datepicker-details').hide();
        $('#redcat-datepicker-details .loading').hide();
        $('#redcat-datepicker').datepicker({
          defaultDate: Drupal.settings.redcat_event_default_date,
          monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          showOtherMonths: true,
          selectOtherMonths: true,
          onSelect:   
          function(dateText, inst) {
	          setTimeout(redcat_customizations_update_month, 50);
          	$('#redcat-datepicker-details .loading').fadeIn('fast');
          	$('#redcat-datepicker-details').show();
            //Use date text to figure out week.
            var date = new Date(dateText);
            date.setDate(date.getDate());
            var new_date_text = date.getFullYear() + 
            	redcat_customizations_pad(date.getMonth() + 1) + 
            	redcat_customizations_pad(date.getDate());
            var uri = '/datepicker/' + new_date_text;
            $('#redcat-datepicker-details .content').load(uri+' .view-datepicker-details', null, function() { 
							//replace headers
/*
							$("#redcat-datepicker-details .content h3").each(function() {
							    var texta = $(this).text();
							    texta = texta.replace("REDCAT Event", "In The Theater");
							    $(this).text(texta);
							    
							    var textb = $(this).text();
							    textb = textb.replace("Gallery Exhibition", "In The Gallery");
							    $(this).text(textb);
							});					
*/
									
	            $('#redcat-datepicker-details .loading').fadeOut();
	            $('#redcat-datepicker-details .content').fadeIn('slow');
	            
            });

            //window.location = uri;
            //$('#redcat-datepicker-details').show();

          },
          onChangeMonthYear: function(year, month, inst) {
            Drupal.settings.redcat_customizations_current_date = redcat_customizations_pad(year) +
              '-' + redcat_customizations_pad(month);
            setTimeout(redcat_customizations_update_month, 100);
          }
        });
        $('.ui-datepicker-today').removeClass('ui-datepicker-current-day');
        redcat_customizations_update_month();
      });
    }
  }
  // end new stuff
  
  function redcat_customizations_update_month() {
    Drupal.settings.redcat_customizations_current_year = year = Drupal.settings.redcat_customizations_current_date.substring(0, 4);
    Drupal.settings.redcat_customizations_current_month = month = Drupal.settings.redcat_customizations_current_date.substring(5);
    var dates = Drupal.settings.redcat_event_dates;
    if (dates[year] != undefined && dates[year][month] != undefined) {
      
      $('.ui-datepicker-calendar td').not('.ui-datepicker-other-month').each(function(index, value) {
        var year = Drupal.settings.redcat_customizations_current_year;
        var month = Drupal.settings.redcat_customizations_current_month;
        var dates = Drupal.settings.redcat_event_dates;
        var date = redcat_customizations_pad(index + 1);
        if (dates[year][month][date] != undefined) {
          $(this).addClass('has-event');
        }
      });
    }

    var datepicker_title = $('#redcat-datepicker').find('.ui-datepicker-title');
    var new_title = '<a href="' + Drupal.settings.redcat_event_base_uri + '/' +
      Drupal.settings.redcat_customizations_current_date +
      '" title="Calendar Month view for ' +
      Drupal.settings.redcat_customizations_current_date + '">' +
      $(datepicker_title).html() + '</a>';
    $(datepicker_title).html(new_title);
  }
  
  function redcat_customizations_pad(number) {
    return (number < 10 ? '0' : '') + number;
  }
  
})(jQuery);
