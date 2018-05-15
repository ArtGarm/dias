function realodCorzine(){

    var steak = 0;

    if ( $('.list-cart>ul>li').length > 1 ){
        $('.list-cart>ul>li').each( function(){

            if ( !$(this).hasClass('empty') ){            
                var price = $(this).find('.price span').html() * 1;
                var counter = $(this).find('.count-num span').html() * 1;

                steak += price * counter;
            }

        });   

    } else {
        steak = 0;

        $(".list-cart ul").getNiceScroll().resize();

        $('.list-cart li.empty').slideDown(300);
        $('.links .button').slideUp(300);
    }

    $('.last-sum .summ-count span').html( steak );

}

$(document).ready(function(){

    if ( $(".list-cart").length ){
        $(".list-cart ul").niceScroll({
            cursorcolor:"#E71938",
            cursorborder:'#E5E5E5',
            cursorwidth:"6px"
        });
    }

    $('.cart-visible').on('click', function(e){
        e.preventDefault();
        
        if ( $(this).hasClass('active') ){
            $(this).removeClass('active');
            $('.cart-hidden').removeClass('active');
            $('body').removeClass('transparenter');
        } else {
            $(this).addClass('active');
            $('.cart-hidden').addClass('active');
            $('body').addClass('transparenter');
        }
    });


    $('.close-cart').on('click', function(e){
        e.preventDefault();
        
        if ( $('.cart-visible').hasClass('active') ){
            $('.cart-visible').removeClass('active');
            $('.cart-hidden').removeClass('active');
            $('body').removeClass('transparenter');
        } else {
            $('.cart-visible').addClass('active');
            $('.cart-hidden').addClass('active');
            $('body').addClass('transparenter');
        }

    });


    $('.deleter').on('click', function(e){
        e.preventDefault();

        var idCart = $(this).closest('li').attr('data-id');

        

        $.ajax({
            url : '/wp-admin/admin-ajax.php',
            data: {
                action : 'removeFromCart',
                id : idCart
            },
            method:'POST',
            success : function(data){
                        
            }
        });

        $(this).closest('li').slideUp(300, function(){

            $(this).remove();
            realodCorzine();
            
        });

        
    })

    $('.list-cart .counter .count-minuso').on('click', function(){

        var idCart = $(this).closest('li').attr('data-id');
        var count  = $(this).closest('.counter').find('.count-num span').html() * 1 - 1;

        if ( count > 0 ){

            $(this).closest('.counter').find('.count-num span').html( count ) ;
            
            $.ajax({
                url : '/wp-admin/admin-ajax.php',
                data: {
                    action : 'addToCart',
                    id : idCart,
                    count : count
                },
                method:'POST',
                success : function(data){
                            
                }
            });


        } else {
            $(this).closest('.counter').find('.count-num span').html( 1 );
        }

        realodCorzine();
    });

    $('.list-cart .counter .counter-pluso').on('click', function(){

        var idCart = $(this).closest('li').attr('data-id');
        var count  = $(this).closest('.counter').find('.count-num span').html() * 1 + 1;

        $(this).closest('.counter').find('.count-num span').html( count ) ;
        
        $.ajax({
            url : '/wp-admin/admin-ajax.php',
            data: {
                action : 'addToCart',
                id : idCart,
                count : count
            },
            method:'POST',
            success : function(data){
                        
            }
        });

        realodCorzine();

    });


});