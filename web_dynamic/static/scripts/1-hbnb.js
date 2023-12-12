#!/usr/bin/node
$(function () {
  const amens = {};
  $('input:checkbox:checked').prop('checked', false);

  $('li input:checkbox').change(function () {
    const amenId = $(this).data('id');
    const amenName = $(this).data('name');
  
    if ($(this).is(':checked')) {
      amens[amenId] = amenName;
    } else {
      delete amens[amenId];
    }
  
    $('.amenities h4').text(Object.values(amens).join(', '));
  });
  
});
