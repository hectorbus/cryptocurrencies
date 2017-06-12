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
      btc = data.payload[0]
      eth = data.payload[1]
      xrp = data.payload[3]

      // btcVar = ((btc.last / btc.vwap) - 1) * 100
      // ethVar = ((eth.last / eth.vwap) - 1) * 100
      // xrpVar = ((xrp.last / xrp.vwap) - 1) * 100

      $bitcoin.find('.bitcoin-ask').text(btc.last)
      $bitcoin.find('.high').text(btc.high)
      $bitcoin.find('.low').text(btc.low)
      $bitcoin.find('.volume').text(parseFloat(btc.volume).toFixed(2))

      $ethereum.find('.ethereum-ask').text(eth.last)
      $ethereum.find('.high').text(eth.high)
      $ethereum.find('.low').text(eth.low)
      $ethereum.find('.volume').text(parseFloat(eth.volume).toFixed(2))

      $ripple.find('.ripple-ask').text(xrp.last)
      $ripple.find('.high').text(xrp.high)
      $ripple.find('.low').text(xrp.low)
      $ripple.find('.volume').text(parseFloat(xrp.volume).toFixed(2))

      $('.number').number(true, 2)
    }
  });
}
