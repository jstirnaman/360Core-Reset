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
  ssHoldingData(this)
})

function ssHoldingData(holding) {
 $j(holding).find('td.SS_HoldingData').each(function(){
   tr = $j(this).parent()
   cells = $j(this).children()
   tr.empty()
   tr.append(cells)
   tr.children().wrap("<td class='SS_HoldingData'/>")
  })
}

// Append the journal holding URL as a ?url= param to the report form.
function setProblemReportLink(elements, urlParams){
holdingsdata = $j(elements).find('td.SS_HoldingData')
holdingsdata.each(function(){
  var prl = $j(this).find('span.SS_custom_all_titles_public_note.SS_custom_external_link a')
  if (prl.attr('href') == problemReportForm) {
    var jcd = $j(this).find('.SS_JournalCoverageDates')
    var jl = $j(this).find('a.SS_JournalHyperLink')
    var journalurl = jl.get(0).href
    prl.attr('href', prl.attr('href') + '?url=' + encodeURIComponent(journalurl)
      + '&notes=Provider: ' + encodeURIComponent(jl.html())
      + '%0AEJF%20Search%20Results%20URL: ' + encodeURIComponent(document.URL) 
      + urlParams
    )
    prl.html('Report a problem')
    // Coverage Date text can also be customized in 360Core Admin
    jcd.html(jcd.html().replace('from', '').trim())
  }
})

// Replace label for Terms of Use link.
$j('.SS_EJPTermsOfUse a').html('Terms of Use')
}

// Replace line break above results.
var resultsbr = $j('.SS_ResultsNoteGroup br')
if (resultsbr.length > 1) {
  resultsbr.first().remove()  
}

// Replace breaks between results?
$j('.SS_Holding br').remove()
})
