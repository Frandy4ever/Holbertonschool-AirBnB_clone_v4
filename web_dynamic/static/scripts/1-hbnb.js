#!/usr/bin/node
$(function () {
  const amens = {};
  // Uncheck all checkboxes when the page loads
  $('input:checkbox:checked').prop('checked', false);

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      // Create a new object to avoid mutation
      const newAmens = { ...amens };
      newAmens[$(this).data('id')] = $(this).data('name');
      // Update reference to the object
      Object.assign(amens, newAmens);
    } else {
       // Create a new object to avoid mutation
      const newAmens = { ...amens };
      delete newAmens[$(this).data('id')];
      // Update reference to the object
      Object.assign(amens, newAmens);
    }
    $('.amenities h4').text(Object.values(amens).join(', '));
  });
});
