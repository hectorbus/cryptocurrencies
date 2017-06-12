$(document).ready(function(){
  getCurrency()
  setInterval(function(){
    getCurrency()
  }, 5000)
})

function getCurrency(){
  $bitcoin = $('#bitcoin')
  $ethereum = $('#ethereum')
  $ripple = $('#ripple')

  $.ajax({
    type: 'GET',
    url: 'https://api.bitso.com/v3/ticker/',
    dataType: 'json',
    success: function (data) {
      $bitcoin.find('.bitcoin-ask').text(data.payload[0].ask)
      $ethereum.find('.ethereum-ask').text(data.payload[1].ask)
      $ripple.find('.ripple-ask').text(data.payload[3].ask)
      $('.currency-price').number(true, 2)
    }
});
}
