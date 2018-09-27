var pre_image_loader = function (request) {
   var start_time = performance.now();
   var total_count = 0;
   var urls = [];
   var result = { success: [], fail: [] };
   request.target.forEach(key => {
      total_count += request.resources[key].length;
      request.resources[key].forEach(url => {
         urls.push(url);
      });
   });
   var binding = function (ev, img) {
      result[ev == 'onerror' ? 'fail' : 'success'].push(img);
      if (result.success.length + result.fail.length == total_count) {
         result.time = performance.now() - start_time;
         request.complete(result);
      } else if (request.serialization) {
         load();
      }
   };
   var create_img = function (url) {
      var img = new Image();
      img.src = url;
      ['onload', 'onerror'].forEach(ev => {
         img[ev] = function () {
            request.progress({
               success: ev == 'onload',
               img: this,
               count: {
                  total: total_count,
                  left: (total_count - 1) - (result.success.length + result.fail.length)
               }
            });
            binding(ev, this);
         };
      });
   };
   var load = function () {
      if (request.serialization) {
         if (urls.length > 0) {
            create_img(urls.splice(0, 1)[0]);
         }
      } else {
         urls.forEach(url => {
            create_img(url);
         });
      }
   };
   load();
};
