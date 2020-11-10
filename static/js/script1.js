			
	// Get a reference to the progress bar, wrapper & status label
	var progress_pdf = document.getElementById("progress_pdf");
	var progress_wrapper_pdf = document.getElementById("progress_wrapper_pdf");
	var progress_status_pdf = document.getElementById("progress_status_pdf");

	// Get a reference to the 3 buttons
	var createPDF = document.getElementById("createPDF");
	var loading_btn_pdf = document.getElementById("loading_btn_pdf");
	var cancel_btn_pdf = document.getElementById("cancel_btn_pdf");
	
	// Function to upload file
	function uploadDFpdf(url) {
		var bg_sel = document.getElementById('bg_color');
		var bg_color = bg_sel.options[bg_sel.selectedIndex].value;
		var checkboxes = document.getElementsByName('item');
		var vals = "" ;
		for (var i=0, n=checkboxes.length;i<n;i++) 
		{
			if (checkboxes[i].checked) 
			{
				vals += ","+checkboxes[i].value;
			}
		}
		console.log(bg_color);
		if (vals) vals = vals.substring(1);
		var itemList =[];
		itemList = vals.split(",");
		
		//if item not Selected then show warning
		if (itemList[0].length==0) {    
			show_alert_scrap("Please Select Items ", "warning");		  
		} 
		
		// if items are selected then create pdf
		else { 
	
	
			// Create a new FormData instance
			var data = new FormData();

			// Create a XMLHTTPRequest instance
			var request = new XMLHttpRequest();

			// Set the response type
			request.responseType = "json";
			 
			 // Append the file to the FormData instance
				data.append("itemList", itemList);
				data.append("bg_color",bg_color);


			// Disable the input during upload
			createPDF.disabled = true;

			// Hide the upload button
			createPDF.classList.add("d-none");

			// Show the loading button
			loading_btn_pdf.classList.remove("d-none");

			// Show the cancel button
			cancel_btn_pdf.classList.remove("d-none");

			// Show the progress bar
			progress_wrapper_pdf.classList.remove("d-none");


			// request progress handler
			request.upload.addEventListener("progress", function (e) {

			// Get the loaded amount and total filesize (bytes)
			var loaded = e.loaded;
			var total = e.total

			// Calculate percent uploaded
			var percent_complete = (loaded / total) * 100;

			// Update the progress text and progress bar
			progress_pdf.setAttribute("style", `width: ${Math.floor(percent_complete)}%`);
			progress_status_pdf.innerText = `${Math.floor(percent_complete)}% uploaded`;

			})

			// request load handler (transfer complete)
			request.addEventListener("load", function (e) {

			if (request.status == 200) {
				var message= request.response.message;
				
				
			  show_alert_scrap(message, "success");
			  
			  
			}
			else {
			  show_alert_scrap("Error in request ", "danger");
			}

			reset_pdf();
			});

			// request error handler
			request.addEventListener("error", function (e) {
			reset_pdf();
			show_alert_scrap("Error please try again later ", "warning");
			});

			// request abort handler
			request.addEventListener("abort", function (e) {
			reset_pdf();
			show_alert_scrap("Process cancelled", "primary");

			});

			// Open and send the request
			request.open("post", url);
			request.send(data);
			cancel_btn_pdf.addEventListener("click", function () {
			request.abort();
			})
		}
	}
	
	// Function to reset the page
	function reset_pdf() {
		// Hide the cancel button
		cancel_btn_pdf.classList.add("d-none");
		// Reset the input element
		createPDF.disabled = false;
		// Show the upload button
		createPDF.classList.remove("d-none");
		// Hide the loading button
		loading_btn_pdf.classList.add("d-none");
		// Hide the progress bar
		progress_wrapper_pdf.classList.add("d-none");
		// Reset the progress bar state
		progress_pdf.setAttribute("style", `width: 0%`);
	}
	
	//The code below should be put in the "js" folder with the name "clear-browser-cache.js"

(function () {
    var process_scripts = false;
    var rep = /.*\?.*/,
    links = document.getElementsByTagName('link'),
    scripts = document.getElementsByTagName('script');
    var value = document.getElementsByName('clear-browser-cache');
    for (var i = 0; i < value.length; i++) {
        var val = value[i],
            outerHTML = val.outerHTML;
        var check = /.*value="true".*/;
        if (check.test(outerHTML)) {
            process_scripts = true;
        }
    }
    for (var i = 0; i < links.length; i++) {
        var link = links[i],
        href = link.href;
        if (rep.test(href)) {
            link.href = href + '&' + Date.now();
        }
        else {
            link.href = href + '?' + Date.now();
        }
    }
    if (process_scripts) {
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i],
            src = script.src;
            if (src !== "") {
                if (rep.test(src)) {
                    script.src = src + '&' + Date.now();
                }
                else {
                    script.src = src + '?' + Date.now();
                }
            }
        }
    }
})();