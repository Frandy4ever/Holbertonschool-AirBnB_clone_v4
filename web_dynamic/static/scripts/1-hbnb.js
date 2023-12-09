#!/usr/bin/node
$(function () {
  const amens = {};

  $('input:checkbox:checked').prop('checked', false);

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      const newAmens = { ...amens };
      newAmens[$(this).data('id')] = $(this).data('name');
      Object.assign(amens, newAmens);
    } else {
      const newAmens = { ...amens };
      delete newAmens[$(this).data('id')];
      Object.assign(amens, newAmens);
    }
    $('.amenities h4').text(Object.values(amens).join(', '));
  });
});
