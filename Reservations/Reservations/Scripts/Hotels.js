////(function () {
//    var images = new Array("hotel1.jpg", "hotel2.jpg", "hotel3.jpg", "hotel4.jpg");
//    for (var i = 0; i < 4; i++) {
//        var template = '<div class="col-sm-12 egr-s-hotel"> <div class="banner"><div class="b-percent">20 %</div></div>';
//        template += '               <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 img-style">';
//        template += '                  <img src="../css/images/' + images[i] + '" />';
//        template += '                            <div class="col-sm-12 egr-no-pad egr-hotel-rent">';
//        template += '                            <a href="#"><i class="fa fa-dollar"></i></a>';
//        template += '                            <a href="#"><i class="fa fa-dollar"></i></a>';
//        template += '                            <a href="#"><i class="fa fa-dollar"></i></a>';
//        template += '                            <a href="#"><i class="fa fa-dollar"></i></a>';
//        template += '                            <a href="#" class="grey"><i class="fa fa-dollar"></i></a></div>';
//        template += '                </div>';
//        template += '                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9 egr-ht-pad egr-no-pad">';
//        template += '                   <h4 class"egr-hotel-title">Hotel Name and City Name - By Name <span class="egr-hotel-cond">Excellent <span class="egr-rate">9.5</span></span></h4>';
//        template += '                    <div class="col-sm-12 egr-hotel-detail egr-no-pad">';
//        template += '                       <div class="col-sm-12 egr-no-pad">';
//        template += '                           <ul class="nav nav-inline">';
//        template += '                                <li class="nav-item">';
//        template += '                                    <strong><span class="text-muted">Booked <span class="label label-danger">152</span> times today</span></strong>';
//        template += '                                </li><li class="nav-item pull-right egr-favorite"><a href="#" class="nav-link"><i class="fa fa-heart-o"></i> Favorite</a></li>';
//        template += '                               </ul></div>';
//        template += '                         <div class="col-sm-12 egr-no-pad egr-hotel-facilities">';
//        template += '                              <ul class="nav nav-inline"> <li class="nav-item">';
//        template += '                                    <a href="#" class="nav-link"><div class="egr-review input-group"><span class="input-group-addon"><i class="fa fa-thumbs-up yellow"></i></span><span>1234</span><small>Reviews</small></div></a></li>';
//        template += '                                  <li class="nav-item">';
//        template += '                                      <a href="#" class="nav-link"> <div class="rating">';
//        template += '                                           <input type="radio" id="star5" name="star' + i + '" value="5" checked="checked" /><label class="full" for="star5" title="Awesome - 5 stars"></label>';
//        template += '                                           <input type="radio" id="star4half0" value="4.5" name="star' + i + '" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
//        template += '                                           <input type="radio" id="star40" name="star' + i + '" value="4" /><label class="full" for="star4" title="Pretty good - 4 stars"></label>';
//        template += '                                           <input type="radio" id="star3half0" value="3.5" name="star' + i + '" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
//        template += '                                           <input type="radio" id="star30" name="star' + i + '" value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label>';
//        template += '                                           <input type="radio" id="star2half0" value="2.5" name="star' + i + '" /><label class="half" for="star2half" title="bad - 2.5 stars"></label>';
//        template += '                                           <input type="radio" id="star20" name="star' + i + '" value="2" /><label class="full" for="star2" title="bad - 2 stars"></label>';
//        template += '                                           <input type="radio" id="star1half0" value="1.5" name="star' + i + '" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
//        template += '                                            <input type="radio" id="star10" name="star' + i + '" value="1" /><label class="full" for="star1" title="bad time - 1 star"></label>';
//        template += '                                           <input type="radio" id="starhalf0" name="star' + i + '" value="half" /><label class="half" for="starhalf" title="big bad time - 0.5 stars"></label></div></a></li></ul>';
//        template += '                               <ul class="nav nav-inline">';
//        template += '                                  <li class="nav-item ">';
//        template += '                                       <a href="#" class="nav-link"><i class="fa fa-signal"></i></a>';
//        template += '                                   </li>';
//        template += '                                  <li class="nav-item ">';
//        template += '                                        <a href="#" class="nav-link"><i class="fa fa-clock-o"></i></a>';
//        template += '                                   </li>';
//        template += '                                   <li class="nav-item ">';
//        template += '                                      <a href="#" class="nav-link"><i class="fa fa-desktop"></i></a>';
//        template += '                                  </li>';
//        template += '                                  <li class="nav-item">';
//        template += '                                      <a href="#" class="nav-link"><i class="fa fa-umbrella"></i></a>';
//        template += '                                  </li><li class="nav-item pull-right egr-price-d"><a href="#" class="nav-link"><span>PKR-</span> <span>3999/Rs</span></a></li></ul></div></div>';
//        template += '                      <div class="col-sm-12 egr-no-pad">';
//        template += '                         <p class="egr-hotel-desc">';
//        template += '                              Some information about the place and the city goes here,  Some information about the place and the city goes here.';
//        template += '                          </p>';
//        template += '                          <div class="col-sm-12 egr-no-pad">';
//        template += '                             <ul class="nav nav-inline egr-hotel-footer">';
//        template += '                                 <li class="nav-item ">';
//        template += '                                     <a href="HotelDetails.aspx" class="nav-link active">View Hotel Details</a>';
//        template += '                                 </li>';
//        template += '                                 <li class="nav-item ">';
//        template += '                                    <a href="HotelDetails.aspx" class="nav-link">View Apartment Details</a></li>';
//        template += '                                    <li class="nav-item ">';
//        template += '                                    <a href="#" class="nav-link no-b">Make Enquiry</a></li></ul>';
//        template += '                                     <a href="booking.aspx" class="btn btn-green pull-right">Book Now</a>  </div></div></div></div>';
//        $(".egr-hotels-container table tbody").append("<tr><td>" + template + "</td></tr>");
//    }
//    $(".egr-hotels-container table").DataTable({
//        "autoWidth": false,
//        "bFilter": false,
//        "bLengthChange": false,
//        "bInfo": false
//    });

//    $('.egr-colapse').on('click', function (e) {
//        var curA = $(this);
//        var caret = $(curA).find("i");
//        if (caret.is(".rotate")) {
//            $(curA).find("i").removeClass("rotate");
//        } else {
//            $(curA).find("i").addClass("rotate");
//        }
//    });

//})($);