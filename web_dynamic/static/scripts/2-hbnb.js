#!/usr/bin/node
$(document).ready(() => {
  const url = `http://${window.location.hostname}`;

  // Uncheck all checkboxes when the page loads
  $('input:checkbox:checked').prop('checked', false);

  $('li input:checkbox').on('change', () => {
    const checkedCheckboxes = $('li input:checkbox:checked');

    const amenityDict = checkedCheckboxes.reduce((obj, checkbox) => {
      const amenityId = $(checkbox).data('id');
      const amenityName = $(checkbox).data('name');
      return { ...obj, [amenityId]: amenityName };
    }, {});

    const amenityArray = Object.values(amenityDict);

    $('.amenities h4').text(amenityArray.join(', '));

    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
  });
});


  $.ajax({
    url: `${url}:5001/api/v1/status/`,
    method: 'GET',
    success: function (dump) {
      const apiStatusDiv = $('div#api_status');
      dump.status === 'OK'
        ? apiStatusDiv.addClass('available')
        : apiStatusDiv.removeClass('available');
    },
    error: function (error) {
      // Handle error
      console.error('Error fetching API status:', error);
    }
  });
});
