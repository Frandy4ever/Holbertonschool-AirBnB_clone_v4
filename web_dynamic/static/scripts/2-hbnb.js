#!/usr/bin/node
$(function () {
  const url = `http://${window.location.hostname}`;
  const amenity = {};

  // Uncheck all checkboxes when the page loads
  $('input:checkbox:checked').prop('checked', false);

  $('li input:checkbox').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      const newAmenity = { ...amenity };
      newAmenity[amenityId] = amenityName;
      Object.assign(amenity, newAmenity);
    } else {
      const newAmenity = { ...amenity };
      delete newAmenity[amenityId];
      Object.assign(amenity, newAmenity);
    }
    console.log(amenity);
    $('.amenities h4').text(Object.values(amenity).join(', '));
    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
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
