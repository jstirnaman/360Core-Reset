/*
* Author: Jason Stirnaman, jstirnaman@kumc.edu, @jastirn
*/

//********** Configuration **********//
// Assumes you have a custom external link set using the All Titles Public Note
// for each provider in SS.
// The URL of the form where your users report problems
var problemReportForm = 'http://library.kumc.edu/e-journal-problem-report-form.xml'


//********** End Configuration **********//

// Simplify the noConflict call since 360Link loads Prototype
window.$j = jQuery.noConflict();

$j(document).ready(function() { // Wait until the original page loads
// Get journal citation info and create the new link
holdings = $j('.SS_Holding')
holdings.each(function(){
  var citationParams = ''
  var citationElems = {
    journal : $j(this).find('.SS_JournalTitle').find('*').html(),
    issn : $j(this).find('.SS_JournalISSN').html()
  }
  for (var el in citationElems) {
    if ( typeof citationElems[el] != 'undefined') {
      citationParams += "&" + el + "=" + encodeURIComponent(citationElems[el].trim())
    }
  }  
  setProblemReportLink(this, citationParams)  
})

// Append the journal holding URL as a ?url= param to the report form.
function setProblemReportLink(elements, urlParams){
holdingsdata = $j(elements).find('td.SS_HoldingData')
holdingsdata.each(function(){
  jl = $j(this).find('a.SS_JournalHyperLink')
  prl = $j(this).find('span.SS_custom_all_titles_public_note.SS_custom_external_link a')
  if(prl.attr('href') == problemReportForm) {
  prl.attr('href', prl.attr('href') + '?url=' + encodeURI(jl.attr('href')) + urlParams)
  }
})
}

})