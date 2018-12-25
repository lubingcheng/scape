new Vue({
    el: '#app',
    data: {
    },
    methods: {
        sysChange: function (e) {
            for (var i = 0; i < menus.length; i++) {
                if (e == menus[i].id) {
                    $("#cntIfm").attr("src", "page/" + menus[i].page + ".html");
                }
            }
        }
    }
})

$("#cntIfm").height(document.body.offsetHeight - 65);

$(".loginout").click(function () {
    window.location = "login.html";
})