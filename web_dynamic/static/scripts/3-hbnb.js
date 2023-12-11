#!/usr/bin/node
document.addEventListener('DOMContentLoaded', function () {
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

  fetch(`$(url):5001/api/v1/status/`)
	.then(response => response.json())
	.then(data => {
		const apiStatusDiv = document.querySelector('div#api_status');
		if (data.status == 'OK') {
			apiStatusDiv.classList.add('available');
		} else {
			apiStatusDiv.classList.remove('available');
		}
	})
	.catch(error => {
		console.error('Error fectching API status:', error);
	});
});
