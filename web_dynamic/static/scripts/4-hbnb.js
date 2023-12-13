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

  $.ajax({
    type: 'POST',
    url: `${url}:5001/api/v1/places_search/`,
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      const placesSection = $('section.places');
      const dataSort = data.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);

      for (const place of dataSort) {
        const guestS = place.max_guest === 1 ? '' : 's';
        const bedsS = place.number_rooms === 1 ? '' : 's';
        const bathsS = place.number_bathrooms === 1 ? '' : 's';

        placesSection.append(`
                <article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${guestS}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${bedsS}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathsS}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>
            `);
      }
    },
    error: function (error) {
      // Handle error
      console.error('Error fetching places:', error);
    }
  });
});

$('button').on('click', () => {
  const placesSection = $('section.places');

  $.ajax({
    type: 'POST',
    url: `${url}:5001/api/v1/places_search/`,
    contentType: 'application/json',
    data: JSON.stringify({ amenities: amenityThing }),
    success: function (data) {
      const dataSort = data.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);

      // Empty the section before appending new results
      placesSection.empty();

      for (const place of dataSort) {
        const guestS = place.max_guest === 1 ? '' : 's';
        const bedsS = place.number_rooms === 1 ? '' : 's';
        const bathsS = place.number_bathrooms === 1 ? '' : 's';

        placesSection.append(`
                  <article>
                      <div class="title_box">
                          <h2>${place.name}</h2>
                          <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                          <div class="max_guest">${place.max_guest} Guest${guestS}</div>
                          <div class="number_rooms">${place.number_rooms} Bedroom${bedsS}</div>
                          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathsS}</div>
                      </div>
                      <div class="description">
                          ${place.description}
                      </div>
                  </article>
              `);
      }
    }
  });
});
