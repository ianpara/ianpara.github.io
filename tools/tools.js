function massOpen() {

    var form = document.getElementById('form');
    var BASE_URL = form.elements.baseUrl.value;
    var paths = form.elements.pathList.value;

    var lines = paths.split('\n');

    for (var i = 0; i < lines.length ; i++) {
        var url = BASE_URL + lines[i];
        window.open(url, '_blank')
        console.log(url);
    }

}

function customMassOpen() {

    var form = document.getElementById('form');
    var BASE_URL = form.elements.baseUrl.value; console.log(BASE_URL);
    var paths = form.elements.pathList.value; console.log(paths);
    var searchString = form.elements.searchString.value; console.log(searchString);
    var customURLInsert = form.elements.customURLInsert.value; console.log(customURLInsert);

    var lines = paths.split('\n'); console.log(lines);

    for (var i = 0; i < lines.length ; i++) {
        //combines base_url and pathname
        var url = BASE_URL + lines[i];

        //get array of path from parse function
        var pathArray = pathToArray(url);

        //assign x to boolean (t/f) if test value is in path
        var x = pathArray.includes(searchString)
        console.log(x);

         //assign es to boolean (t/f) if es is in first part of path
        var es = pathArray[1].includes('es')

        //If path has search string (ie guaFooter.php) then open page in apply page
        if (x) {
            //If spanish page, add /es/
            if (es) {
                var url = BASE_URL + pathArray[1] + '/' + pathArray[2] + customURLInsert + pathArray[4] + '/'; 
            } else {
                var url = BASE_URL + pathArray[1] + customURLInsert + pathArray[3] + '/';
            }
        }

        //Open page
        window.open(url, '_blank')
        console.log(url);

    };

}


function parseUrl(address) {

    var parser = document.createElement('a'),
    searchObject = [],
    queries, split, i;

    // Let the browser do the work
    parser.href = address;

    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }

    var parseObj = {hosttname:parser.host, pathname:parser.pathname};

    return parseObj;

}

//Turn URL path into an array
function pathToArray(address) {

    var q = parseUrl(address);

    var parts = q.pathname.split("/")

    return parts;


}

function popUpTest() {
    
    for (var i = 0; i < 2 ; i++) {
        var myPopup = window.open("https://www.example.com", "", "directories=no,height=150,width=150,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");
        
        if (!myPopup)
        alert("Please enable popups.");
        
        else {
          myPopup.onload = function() {
            setTimeout(function() {
                if (myPopup.screenX === 0) {
                    alert("Please enable popups.");
                } else {
                    // close the test window if popups are allowed.
                    myPopup.close();  
                }
            }, 0);
          };
        }
        myPopup.close();
    }
  }


