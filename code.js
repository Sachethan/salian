function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var title = data.title;
  var message = data.message;
  var link = data.link;

  var payload = {
    app_id: "d8f6e06d-5c04-4679-858c-4977af800613",
    headings: { "en": title },
    contents: { "en": message },
    included_segments: ["All"]
  };

  if (link) {
    payload.url = link;
  }

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Basic os_v2_app_3d3oa3k4ardhtbmmjf327aagcosdxjaek57ehkugvec6e2d4sthatju5iec24fmemnl4hr4676uouxkih4s5xep2txtvznccbkzpupi"
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch("https://onesignal.com/api/v1/notifications", options);
  return ContentService.createTextOutput("Notification Sent");
}



function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var title = data.title;
  var message = data.message;

  var redirectUrl = "itssachethan.blogspot.com?title=" + encodeURIComponent(title) + "&msg=" + encodeURIComponent(message) + "#notification";

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Basic os_v2_app_3d3oa3k4ardhtbmmjf327aagcosdxjaek57ehkugvec6e2d4sthatju5iec24fmemnl4hr4676uouxkih4s5xep2txtvznccbkzpupi"
    },
    payload: JSON.stringify({
      app_id: "d8f6e06d-5c04-4679-858c-4977af800613",
      headings: { "en": title },
      contents: { "en": message },
      url: redirectUrl, // Open this URL on notification click
      included_segments: ["All"]
    })
  };

  UrlFetchApp.fetch("https://onesignal.com/api/v1/notifications", options);
  return ContentService.createTextOutput("Sent");
}



https://itssachethan.blogspot.com/?m=1#notification
https://itssachethan.blogspot.com/?m=1#notification?title=Yyy&msg=https%3A%2F%2Fitssachethan.blogspot.com%2F#notification

https://itssachethan.blogspot.com?title=Hiii&msg=Fhv%2F#notification"
