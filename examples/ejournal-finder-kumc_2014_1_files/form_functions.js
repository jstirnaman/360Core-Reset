    function localFocus() {
      var elem = document.getElementById("SS_CFocusTag");
      if (elem != null) elem.focus();
    }

    /**
     * Clears all elements of the given types in the named form
     *  name - name of the form we are manipulating
     *  types - comma-separated list of types of form fields to clear
     *  Note:  A more thorough implementation would test the type of the input field
     *         and do clearing appropriate for that type, but this suffices for our
     *         purposes.
     */
    function clearForm(name, types) {
      var form = document.forms[name];
      for (i = 0; i < form.elements.length; i++) {
         elem = form.elements[i];
         if (types.indexOf(elem.type) >= 0 && 
             (elem.name.indexOf("rft.") == 0 || elem.name == 'SS_doi' || elem.name == 'pmid')) {
           elem.value = '';
         }
      }
    }

    /**
     * Selects Journal, Book, and other.
     *  selectAllCheckbox - Handle to the select all Checkbox itself.
     */
    function setAllCheckboxes(selectAllCheckbox) {
      var form = selectAllCheckbox.form;
      for (var formElementIndex = 0; formElementIndex < form.elements.length; ++formElementIndex) {
        var formElement = form.elements[formElementIndex];
        if (formElement.value != this.selectAllCheckboxValue) {
          formElement.checked = selectAllCheckbox.checked;
        }
      }
    }
    
    /**
     * Updates Select All based on state of Journal, Book, and other.
     *  updateSelectAll - Handle to the select all Checkbox itself.
     */
     function updateSelectAll(selectedCheckBox) {
      var form = selectedCheckBox.form;
      var allChecked = true;
      for (var formElementIndex = 0; formElementIndex < form.elements.length; formElementIndex++) {
        var formElement = form.elements[formElementIndex];        
        if (formElement.name != 'SS_searchTypeAll' && 
              (formElement.name.indexOf('SS_searchType') != -1) && 
              formElement.checked == '') {
                allChecked = false;
                
   		     //alert(" " + formElement.checked);
		     //alert(" " + formElement.defaultChecked);
		     //alert(" " + formElement.name);
		     //alert(" " + formElement.type);
		     //alert(" " + formElement.form);
		     //alert(" " + formElement.value);

        }
      }
      
      selectedCheckBox.form.elements['SS_searchTypeAll'].checked = allChecked;
    }

     /**
      * Submit the subject selector form and add checkbox values if present.
      */
     function submitCategorySelectorForm(form) {
    	 var titleSearchForm = document.forms["SS_EJPSearchForm"];
    	 
    	 var searchTypeAll = titleSearchForm.elements["SS_searchTypeAll"];
    	 if (searchTypeAll != null && searchTypeAll.checked) {
   			 var el = document.createElement("input");
   			 el.type = "hidden";
   			 el.name = "SS_searchTypeAll";
   			 el.value = "yes";
   			 form.appendChild(el);
    	 }
    	 
	     var searchTypeBook = titleSearchForm.elements["SS_searchTypeBook"];
	     if (searchTypeBook != null && searchTypeBook.checked) {
	  		var el = document.createElement("input");
	   		el.type = "hidden";
	   		el.name = "SS_searchTypeBook";
	   		el.value = "yes";
	   		form.appendChild(el);
	     }

	     var searchTypeJournal = titleSearchForm.elements["SS_searchTypeJournal"];
	     if (searchTypeJournal != null && searchTypeJournal.checked) {
	  		var el = document.createElement("input");
	   		el.type = "hidden";
	   		el.name = "SS_searchTypeJournal";
	   		el.value = "yes";
	   		form.appendChild(el);
	     }

	     var searchTypeOther = titleSearchForm.elements["SS_searchTypeOther"];
	     if (searchTypeOther != null && searchTypeOther.checked) {
	  		var el = document.createElement("input");
	   		el.type = "hidden";
	   		el.name = "SS_searchTypeOther";
	   		el.value = "yes";
	   		form.appendChild(el);
	     }
    	 
    	 form.submit();
     }

     function getArrayItemByName(name, array) {
    	 var ret = null;
    	 for (var i = 0; i < array.length; i++) {
    		 if (array[i].name && name == array[i].name) {
    			 ret = array[i];
    		 }
    	 }
    	 
    	 return ret;    	 
     }
     
     function getFirstElementByName(name) {
    	 var arr = document.getElementsByName(name);
    	 if (arr) {
    		 return arr[0];
    	 } else {
    		 return null;
    	 }    	 
     }
     
     /**
      * Submit the A to Z link and add checkbox values if present.
      */
     function submitAtoZLink(url, searchTypes) {
    	 var titleSearchForm = getArrayItemByName("SS_EJPSearchForm", document.forms);
    	 if (titleSearchForm != null) {
	    	 var searchTypeAll = getFirstElementByName("SS_searchTypeAll");
	    	 if (searchTypeAll != null && searchTypeAll.checked) {
	   			 url += "&SS_searchTypeAll=yes";
	    	 }
	    	 
		     var searchTypeBook = getFirstElementByName("SS_searchTypeBook");
		     if (searchTypeBook != null && searchTypeBook.checked) {
		  		url += "&SS_searchTypeBook=yes";
		     }
	
		     var searchTypeJournal = getFirstElementByName("SS_searchTypeJournal");
		     if (searchTypeJournal != null && searchTypeJournal.checked) {
		  		url += "&SS_searchTypeJournal=yes";
		     }
	
		     var searchTypeOther = getFirstElementByName("SS_searchTypeOther");
		     if (searchTypeOther != null && searchTypeOther.checked) {
		  		url += "&SS_searchTypeOther=yes";
		     }
    	 }
    	 else {
    		 if (searchTypes != null && searchTypes.length > 0) {
    			 url += searchTypes;
    		 }
    	 }

    	 location.href = url;    	 
     }
