var titleCurrency = 'bitcoin';
var beep = new Audio('sounds/Beep.mp3');
var bleep = new Audio('sounds/Beep.mp3');

$("#fakeloader").fakeLoader({
  timeToHide:2000,
  zIndex:"99999",
  spinner:"spinner6",
  bgColor:"#3e3e3e",
})

function muted(){
  beep.muted = true
  bleep.muted = true
}

function unMuted(){
  beep.muted = false
  bleep.muted = false
}

$('.sound i').click(function() {
  $(this).toggleClass("fa-volume-up fa-volume-off");
  return $(this).hasClass('fa-volume-up') ? unMuted() : muted();
})

$('.fav-star').click(function(){
  $('.fav-star').css('color', '#E2E2E2')
  $(this).css('color', '#FCBE1F')
  $('title').text('Loading... | Cryptocurrencies')
})

function addDataCurrency($container, currency) {
  $container.find('.last-price').text(currency.last)
  $container.find('.high').text(currency.high)
  $container.find('.low').text(currency.low)
  $container.find('.volume').text(parseFloat(currency.volume).toFixed(2))

  if(currency.high == currency.last){
    $container.find('.last-price').addClass('currancy-max')
    bleep.play()
  }else if(currency.low == currency.last) {
    $container.find('.last-price').addClass('currancy-min')
    beep.play()
  }else {
    $container.find('.last-price').removeClass('currancy-min currancy-max')
  }
}

function setTitleCurrency(currency, coin){
  var value = $.number(currency.last, 2);
  console.log(value)
  $('title').text('$' + value + '/' + coin + ' | Cryptocurrencies')
}

$(document).ready(function(){
  getCurrency()
  setInterval(function(){
    getCurrency()
  }, 5000)

  $('.fav-star').click(function(){
    titleCurrency = $(this).closest('.currency-container').attr('id')
  })

  function getCurrency(){
    var $bitcoin = $('#bitcoin')
    var $ethereum = $('#ethereum')
    var $ripple = $('#ripple')

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

        addDataCurrency($bitcoin, btc)
        addDataCurrency($ethereum, eth)
        addDataCurrency($ripple, xrp)

        if (titleCurrency == 'bitcoin') {
          setTitleCurrency(btc, 'BTC')
        }else if (titleCurrency == 'ethereum') {
          setTitleCurrency(eth, 'ETH')
        }else if (titleCurrency == 'ripple') {
          setTitleCurrency(xrp, 'XRP')
        }

        $('.number').number(true, 2)
      }
    })
  }
})
