
	// Function to show alerts
	function show_listCAT(superCat,cat) {
		
		SupCatHTML =``;
		
		for (Scat of superCat){
			Scat = Scat.replace('&','And');
			SupCatHTML = `	
							<div class="card">
								<div class="card-header px-3" role="tab" id="${Scat.replace(/ /g, "-")}-card-heading">
									<h6> 
										<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#${Scat.replace(/ /g, "-")}" aria-expanded="false" aria-controls="${Scat.replace(/ /g, "-")}"> ${Scat} </a> 
									</h6>
								</div>
								<div id="${Scat.replace(/ /g, "-")}" class="card-collapse collapse" role="tabpanel" aria-labelledby="${Scat.replace(/ /g, "-")}">
									<div class="card-body" id="${Scat.replace(/ /g, "-")}-body" >
									</div>
								</div>
							</div>
						`
			listcat =``;
			for (i in cat){
				if (Scat == cat[i]['Scat']){
					listcat +=	`<div class="checkbox"> <label for="${cat[i]['cat']}"> <input type="checkbox" name="category" value="${cat[i]['cat']}" onclick="selectedCAT()" id="${cat[i]['cat']}">&nbsp;<span class="list-group-item-text"><i class="fa fa-fw">${cat[i]['cat']}</i></span></label> </div>`;
				}
			}
			document.getElementById("accordion").innerHTML += SupCatHTML;
			
			document.getElementById(Scat.replace(/ /g, "-")+'-body').innerHTML = listcat;
		
		}
		 
		
		
	}
	
	
	// Function to show alerts
	function show_alert_scrap(message, alert) {
	
		if(alert=="success"){
		document.getElementById("alert_wrapper_scrap").innerHTML =`
					<div id="alert" class="alert alert-${alert} alert-dismissible fade show shadow" role="alert">
					  <span>${message}</span>
					  <button type="button" class="close" onclick="reset_scrap();" data-dismiss="alert" aria-label="Close" >
						<span aria-hidden="true">&times;</span>
					  </button>
					   
					</div>
					<div class="form-group mb-2">
						<a href="/pdfViewer" class="btn btn-primary btn-sm  shadow" role="button" aria-pressed="true">Preview PDF</a>
						<a href="/downloadpdf" class="btn btn-secondary btn-sm  shadow " role="button" aria-pressed="true">Download PDF</a>
					</div>
		
		`
		
		}
		else{
				 document.getElementById("alert_wrapper_scrap").innerHTML = `
					<div id="alert" class="alert alert-${alert} alert-dismissible fade show shadow" role="alert">
					  <span>${message}</span>
					  <button type="button" class="close" onclick="reset_scrap();" data-dismiss="alert" aria-label="Close" >
						<span aria-hidden="true">&times;</span>
					  </button>
					</div>
				  `
			}
	}
	function show_items(data) {
	
		
		var itemsgrids  = ` ` ;
		for(let i= 0; i<data["length"];i++){
		 itemsgrids += `
						 <div class="col-md-6 mb-4">
							<div class="card  shadow"><label for="item-${data[i]["Index"]}">
							  <div class="card-body">
								<h6 id="${data[i]["Index"]}" class="card-title">
								  <input type="checkbox" id="item-${data[i]["Index"]}" value="${data[i]["Index"]}"  name="item" aria-label="Checkbox for following text input">
									${data[i]["Item"]}</input>
								</h6>
								<h6>${data[i]["Price"]}</h6>
							  </div></label>
							</div>
						</div>` ;
		 }
		 document.getElementById("itemsgrids").innerHTML = itemsgrids;
    }