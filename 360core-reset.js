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

holdingsdata = $j('.SS_Holding td.SS_HoldingData')

// Append the journal holding URL as a ?url= param to the report form.
holdingsdata.each(function(){
  jl = $j(this).find('a.SS_JournalHyperLink')
  prl = $j(this).find('span.SS_custom_all_titles_public_note.SS_custom_external_link a')
  //prl = $j(prl).filter(function(i, a){ $j(a).attr('href') })
  prl_href = prl.attr('href') == problemReportForm ? prl.attr('href') + '?url=' + jl.attr('href') : prl.attr('href')
  prl.attr('href', prl_href)
})

})