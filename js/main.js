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

$('.sound span').click(function() {
  $(this).find('.text-danger').toggle().toggleClass('mutedSound')
  return $('.sound .text-danger').hasClass('mutedSound') ? muted() : unMuted()
})

function addDataCurrency($container, currency, dropdown, currencyName, conveCurrency) {
  $container.find('.last-price').text(currency.last)
  $container.find('.high').text(currency.high)
  $container.find('.low').text(currency.low)
  $container.find('.volume').text(parseFloat(currency.volume).toFixed(2))

  $('nav').find(dropdown).text('$' + $.number(currency.last, 2) + ' ' + conveCurrency +'/' + currencyName)
  if (currencyName == 'BCH') {
    $('nav').find(dropdown).text('$' + $.number(currency.last, 5) + ' ' + conveCurrency +'/' + currencyName)
  }

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
  $('title').text('$' + value + ' MXN/' + coin + ' | Cryptocurrencies')
  $('.fav-currency').text('$' + value + ' MXN/' + coin)

  if(coin == 'BCH'){
    $('title').text('$' + $.number(currency.last, 5) + ' BTC/' + coin + ' | Cryptocurrencies')
    $('.fav-currency').text('$' + $.number(currency.last, 5) + ' BTC/' + coin)
  }
}

$(document).ready(function(){
  getCurrency()
  muted()
  setInterval(function(){
    getCurrency()
  }, 5000)

  $('nav .dropdown-menu li').click(function(){
    titleCurrency = $(this.children).attr('currencyName')
    $('.fav-currency, title').text($(this.children).text())
  })

  $('.navbar-brand').hover(function(){
    $(this).typeIt({
     strings: ['CryptoCurrencies']
    })
  }, function(){
    $(this).typeIt({
     strings: ['CC'],
     cursor: false
    })
  })

  $('.modal-title').typeIt({
    strings: ['CryptoCurrencies']
  })

  function getCurrency(){
    var $bitcoin = $('#bitcoin')
    var $bitcoinCash = $('#bitcoinCash')
    var $ethereum = $('#ethereum')
    var $ripple = $('#ripple')

    $.ajax({
      type: 'GET',
      url: 'https://api.bitso.com/v3/ticker/',
      dataType: 'jsonp',
      crossDomain: true,
      success: function (data) {
        console.log(data);
        btc = data.payload[0]
        bch = data.payload[5]
        eth = data.payload[1]
        xrp = data.payload[3]

        addDataCurrency($bitcoin, btc, '.dropdown-fav-btc', 'BTC', 'MXN')
        addDataCurrency($bitcoinCash, bch, '.dropdown-fav-bch', 'BCH', 'BTC')
        addDataCurrency($ethereum, eth, '.dropdown-fav-eth', 'ETH', 'MXN')
        addDataCurrency($ripple, xrp, '.dropdown-fav-xrp', 'XRP', 'MXN')

        if (titleCurrency == 'bitcoin') {
          setTitleCurrency(btc, 'BTC')
        }else if (titleCurrency == 'bitcoinCash') {
          setTitleCurrency(bch, 'BCH')
        }else if (titleCurrency == 'ethereum') {
          setTitleCurrency(eth, 'ETH')
        }else if (titleCurrency == 'ripple') {
          setTitleCurrency(xrp, 'XRP')
        }

        $('.number').number(true, 2)
        $('.number3').number(true, 3)
        $('.number5').number(true, 5)
      }
    })
  }
})
