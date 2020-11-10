
	
	function selectedCAT(){
	
		var checkboxes = document.getElementsByName('category');
		var sel = document.getElementById('sortby');
		var sortby = sel.options[sel.selectedIndex].value;
		var vals = "";
		for (var i=0, n=checkboxes.length;i<n;i++) 
		{
			if (checkboxes[i].checked) 
			{
				vals += ","+checkboxes[i].value;
			}
		}
		if (vals) vals = vals.substring(1);
		var CatList =[];
		CatList = vals.split(",");

		// Create a new FormData instance
		var data = new FormData();

		// Create a XMLHTTPRequest instance
		var Sel_Cat_request = new XMLHttpRequest();
		
		// Set the response type
		Sel_Cat_request.responseType = "json";

		// Append the file to the FormData instance
		data.append("CatList", CatList);
		data.append("sortby" , sortby)

		// request load handler (transfer complete)
		Sel_Cat_request.addEventListener("load", function (e) {

		if (Sel_Cat_request.status == 200) {

		var items = Sel_Cat_request.response.data;
		show_items(items);
		

		}
		else {

		show_alert_scrap("Error", "danger");

		}
		});
		// Open and send the request
		Sel_Cat_request.open("post", "/filter");
		Sel_Cat_request.send(data);
	}

	// Get a reference to the progress bar, wrapper & status label
	var progress_scrap = document.getElementById("progress_scrap");
	var progress_wrapper_scrap = document.getElementById("progress_wrapper_scrap");
	var progress_status_scrap = document.getElementById("progress_status_scrap");

	// Get a reference to the 3 buttons
	var upload_btn_scrap = document.getElementById("scrapURLbtn");
	var loading_btn_scrap = document.getElementById("loading_btn_scrap");
	var cancel_btn_scrap = document.getElementById("cancel_btn_scrap");
	
	// Get a reference to the url  input label 
	var scrapURLinput =document.getElementById("scrapURLinput");
	
	// Function to upload file
	function uploadURLscrap(url) {

	  // Reject if the file input is empty & throw alert
	  if (!scrapURLinput.value ) {					
		show_alert_scrap("Please enter url over here", "warning")
		return;
	  }
	  // Create a new FormData instance
	  var data_scrap = new FormData();

	  // Create a XMLHTTPRequest instance
	  var request = new XMLHttpRequest();

	  // Set the response type
	  request.responseType = "json";

	  // Disable the input during upload
	  scrapURLinput.disabled = true;

	  // Hide the upload button
	  upload_btn_scrap.classList.add("d-none");

	  // Show the loading button
	  loading_btn_scrap.classList.remove("d-none");

	  // Show the cancel button
	  cancel_btn_scrap.classList.remove("d-none");

	  // Show the progress bar
	  progress_wrapper_scrap.classList.remove("d-none");

	  // Get a reference to the url input values
	  var scrapURLinput_value = scrapURLinput.value;
	  
	  // Append the file to the FormData instance
	  data_scrap.append("scrapURLinput", scrapURLinput_value);
	  
	  
	  // request progress handler
	  request.upload.addEventListener("progress", function (e) {

		// Get the loaded amount and total filesize (bytes)
		var loaded = e.loaded;
		var total = e.total

		// Calculate percent uploaded
		var percent_complete = (loaded / total) * 100;

		// Update the progress text and progress bar
		progress_scrap.setAttribute("style", `width: ${Math.floor(percent_complete)}%`);
		progress_status_scrap.innerText = `${Math.floor(percent_complete)}% uploaded`;

	  })

	  // request load handler (transfer complete)
	  request.addEventListener("load", function (e) {

		if (request.status == 200) {
			var cat = request.response.Cat;
			var superCat = request.response.superCat;
			var items = request.response.data;
			show_listCAT(superCat,cat);
			show_items(items);
			console.log(request.response);
			
		}
		else {
		  show_alert_scrap("Error in request", "danger");
		}

		reset_scrap();
	  });

	  // request error handler
	  request.addEventListener("error", function (e) {
		reset_scrap();
		show_alert_scrap("Error please try again later", "warning");
	  });

	  // request abort handler
	  request.addEventListener("abort", function (e) {
		reset_scrap();
		show_alert_scrap("Process cancelled", "primary");

	  });

	  // Open and send the request
	  request.open("post", url);
	  request.send(data_scrap);
	  cancel_btn_scrap.addEventListener("click", function () {
		request.abort();
	  })
	  
	}
	//funtion uploadURLscrap end
	document.getElementById('selectAllItems').onclick = function() {
		  var checkboxes = document.getElementsByName('item');
		  for (var checkbox of checkboxes) {
			checkbox.checked = this.checked;

		  }
		  }
	document.getElementById('select-all').onclick = function() {
		  var checkboxes = document.getElementsByName('category');
		  for (var checkbox of checkboxes) {
			checkbox.checked = this.checked;
			
		  }
		  selectedCAT();
		  }
	// Function to reset the page
	function reset_scrap() {

	  // Clear the input
	  scrapURLinput.value =null;
	  // Hide the cancel button
	  cancel_btn_scrap.classList.add("d-none");
	  // Reset the input element
	  scrapURLinput.disabled = false;
	  // Show the upload button
	  upload_btn_scrap.classList.remove("d-none");
	  // Hide the loading button
	  loading_btn_scrap.classList.add("d-none");
	  // Hide the progress bar
	  progress_wrapper_scrap.classList.add("d-none");
	  // Reset the progress bar state
	  progress_scrap.setAttribute("style", `width: 0%`);
	}
	//funtion reset end