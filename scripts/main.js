function convertFileToBase64viaFileReader(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var reader  = new FileReader();
      reader.onloadend = function () {
          callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function Application() {
    this.picture = ko.observable();
    this.lead = ko.observable();
    this.subject = ko.observable('Цифра дня');
}

Application.prototype.save = function() {
    // var canvas = document.getElementById('canvas');
    // var context = canvas.getContext('2d');

    // domvas.toImage(document.getElementById('picture'), function() {
    //     context.drawImage(this, 0, 0);
    // });

    html2canvas(document.getElementById('picture'), {
        useCORS: true,
        onrendered: function(canvas) {
            canvas.toBlob(function(blob) {
                saveAs(blob, "pretty image.png");
            });
        }
    });
};

var app = new Application();
ko.applyBindings(app);