$(document).ready(function(){
    $(".weather-form").submit(function(e) {
        e.preventDefault();

        var location = $("#city-selector").val();
        location = location.replace(" ", "");
        location = location.replace(",", "%2C%20");

        var api = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22[[cities%2C%20state]]%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

        api = api.replace("[[cities%2C%20state]]", location);

        $.ajax({
            url: api,
            success: function(data, status) {
                var city = data.query.results.channel.description.replace('Yahoo! ', '');
                $("#description").html(city);

                var condition = data.query.results.channel.item.condition.text;
                $("#condition").html(condition);

                var temp = data.query.results.channel.item.condition.temp;
                $("#temp").html(temp);
            },
            dataType: "json"
        });
    });
});
