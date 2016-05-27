var app = function() {
    var e = function() {
            l()
        },
        l = function() {
            $("#leftside-navigation .sub-menu > a").click(function(e) {
                $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(), e.stopPropagation()
            })
        },
        s = function() {
            $(".timer").countTo()
        },
        c = function() {
            var e = new Skycons({
                color: "white"
            });
            e.set("clear-day", Skycons.CLEAR_DAY), e.set("clear-night", Skycons.CLEAR_NIGHT), e.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY), e.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT), e.set("cloudy", Skycons.CLOUDY), e.set("rain", Skycons.RAIN), e.set("sleet", Skycons.SLEET), e.set("snow", Skycons.SNOW), e.set("wind", Skycons.WIND), e.set("fog", Skycons.FOG), e.play()
        },
        g = function() {
            Morris.Donut({
                element: "donut-example",
                data: [{
                    label: "Chrome",
                    value: 73
                }, {
                    label: "Firefox",
                    value: 71
                }, {
                    label: "Safari",
                    value: 69
                }, {
                    label: "Internet Explorer",
                    value: 40
                }, {
                    label: "Opera",
                    value: 20
                }, {
                    label: "Android Browser",
                    value: 10
                }],
                colors: ["#1abc9c", "#293949", "#e84c3d", "#3598db", "#2dcc70", "#f1c40f"]
            })
        },
        d = function() {
            $(".slider-span").slider()
        };
    return {
        init: e,
        timer: s,
        sliders: d,
        weather: c,
        morrisPie: g
    }
}();
$(document).ready(function() {
    app.init()
});