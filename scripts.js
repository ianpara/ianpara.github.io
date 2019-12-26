var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 80);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                window.open("crt.html", "_self");
                return;
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
            }

        }
    }
}