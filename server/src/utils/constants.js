export const LEVELS = [100, 200, 300, 400, 500, 600];

export const EXAM_STATUS = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
};

export const PROGRAMS = {
  ACTUARIAL_SCIENCE: "BSc. Actuarial Science",
  AEROSPACE_ENGINEERING: "BSc. Aerospace Engineering",
  AGRIBUSINESS_MANAGEMENT: "BSc. Agribusiness Management",
  AGRICULTURAL_BIOTECHNOLOGY: "BSc. Agricultural Biotechnology",
  AGRICULTURAL_ENGINEERING: "BSc. Agricultural Engineering",
  AGRICULTURE: "BSc. Agriculture",
  AKAN_LANGUAGE: "BA. Akan Language and Culture",
  AQUACULTURE_WATER_RESOURCES:
    "BSc. Aquaculture and Water Resources Management",
  ARCHITECTURE: "BSc. Architecture",
  AUTOMOBILE_ENGINEERING: "BSc. Automobile Engineering",
  BIOCHEMISTRY: "BSc. Biochemistry",
  BIOLOGICAL_SCIENCE: "BSc. Biological Science",
  BIOMEDICAL_ENGINEERING: "BSc. Biomedical Engineering",
  BUSINESS_ADMIN_ACCOUNTING:
    "BSc. Business Administration (Accounting/Banking and Finance)",
  BUSINESS_ADMIN_HRM:
    "BSc Business Administration (Human Resource Mgt./Management)",
  BUSINESS_ADMIN_LOGISTICS_IT:
    "BSc. Business Adm. (Logistics and Supply Chain Mgt/Bus. Info.Tech.)",
  BUSINESS_ADMIN_MARKETING:
    "BSc. Business Administration (Marketing/International Business)",
  CERAMICS_TECHNOLOGY: "BSc. Ceramics Technology",
  CHEMICAL_ENGINEERING: "BSc. Chemical Engineering",
  CHEMISTRY: "BSc. Chemistry",
  CIVIL_ENGINEERING: "BSc. Civil Engineering",
  COMMUNICATION_DESIGN: "BA. Communication Design (Graphic Design)",
  COMPUTER_ENGINEERING: "BSc. Computer Engineering",
  COMPUTER_SCIENCE: "BSc. Computer Science",
  CONSTRUCTION_TECHNOLOGY: "BSc. Construction Technology and Management",
  DEVELOPMENT_PLANNING: "BSc. Development Planning",
  DIETETICS: "BSc Dietetics",
  DISABILITY_REHABILITATION: "BSc. Disability and Rehabilitation Studies",
  DENTAL_SURGERY: "Bachelor of Dental Surgery (BDS)",
  DOCTOR_OF_PHARMACY: "Pharm D (Doctor of Pharmacy)",
  DOCTOR_OF_VETERINARY_MEDICINE: "Doctor of Veterinary Medicine (DVM)",
  ECONOMICS: "BA. Economics",
  EDUCATION_JHS_SPECIALISM: "B.Ed. Junior High School Specialism",
  ELECTRICAL_ENGINEERING: "BSc. Electrical/Electronic Engineering",
  ENGLISH: "BA. English",
  ENVIRONMENTAL_SCIENCES: "BSc. Environmental Sciences",
  FASHION_DESIGN: "BSc. Fashion Design",
  FINE_ART: "BFA. Fine Art and Curatorial Practice",
  FOOD_SCIENCE: "BSc. Food Science and Technology",
  FOREST_RESOURCES_TECHNOLOGY: "BSc. Forest Resources Technology",
  FRENCH: "BA. French and Francophone Studies",
  GEOGRAPHY_RURAL_DEVELOPMENT: "BA. Geography and Rural Development",
  GEOLOGICAL_ENGINEERING: "BSc. Geological Engineering",
  GEOMATIC_ENGINEERING: "BSc. Geomatic (Geodetic) Engineering",
  HERBAL_MEDICINE: "Bachelor of Herbal Medicine (BHM)",
  HISTORY: "BA. History",
  HOSPITALITY_TOURISM: "BSc. Hospitality and Tourism Management",
  HUMAN_BIOLOGY_MEDICINE: "BSc. Human Biology (Medicine)",
  HUMAN_NUTRITION: "BSc Human Nutrition",
  HUMAN_SETTLEMENT_PLANNING: "BSc. Human Settlement Planning",
  INDUSTRIAL_ENGINEERING: "BSc. Industrial Engineering",
  INFORMATION_TECHNOLOGY: "BSc. Information Technology (IT)",
  INTEGRATED_RURAL_ART: "BA. Integrated Rural Art and Industry",
  LAND_ECONOMY: "BSc. Land Economy",
  LANDSCAPE_DESIGN: "BSc. Landscape Design and Management",
  LAW: "LLB",
  LINGUISTICS: "BA. Linguistics",
  MARINE_ENGINEERING: "BSc. Marine Engineering",
  MATERIALS_ENGINEERING: "BSc. Materials Engineering",
  MATHEMATICS: "BSc. Mathematics",
  MECHANICAL_ENGINEERING: "BSc. Mechanical Engineering",
  MEDICAL_IMAGING: "BSc. Medical Imaging",
  MEDICAL_LAB_SCIENCE: "BSc. Medical Laboratory Science",
  MEDIA_COMMUNICATION: "BA. Media and Communication Studies",
  METALLURGICAL_ENGINEERING: "BSc. Metallurgical Engineering",
  METEOROLOGY_CLIMATE: "BSc. Meteorology and Climate Science",
  MIDWIFERY: "BSc. Midwifery",
  NATURAL_RESOURCES_MANAGEMENT: "BSc. Natural Resources Management",
  NURSING: "BSc. Nursing",
  OPTOMETRY: "Doctor of Optometry",
  PACKAGING_TECHNOLOGY: "BSc. Packaging Technology",
  PETROCHEMICAL_ENGINEERING: "BSc. Petrochemical Engineering",
  PETROLEUM_ENGINEERING: "BSc. Petroleum Engineering",
  PHYSICS: "BSc. Physics",
  PHYSIOTHERAPY_SPORTS_SCIENCE: "BSc. Physiotherapy and Sports Science",
  POLITICAL_STUDIES: "BA. Political Studies",
  PUBLIC_ADMINISTRATION: "Bachelor of Public Administration",
  PUBLISHING_STUDIES: "BA. Publishing Studies",
  QUANTITY_SURVEYING: "BSc. Quantity Surveying and Construction Economics",
  REAL_ESTATE: "BSc. Real Estate",
  RELIGIOUS_STUDIES:
    "BA. Religious Studies (BA. Religion and Human Development)",
  SOCIAL_WORK: "BA. Social Work",
  SOCIOLOGY: "BA. Sociology",
  STATISTICS: "BSc. Statistics",
  TELECOMMUNICATION_ENGINEERING: "BSc. Telecommunication Engineering",
  TEXTILE_DESIGN: "BSc. Textile Design and Technology",
};

export const COMPUTER_LABS = {
  MAIN_LIBRARY: "MAIN LIBRARY",
  PHARMACY_BUILDING: "PHARM LAB",
  COS_FF12: "COS FF-12",
  COS_SF26: "COS SF-26",
  COS_SF14: "COS SF-14",
  IDL_COMP_LAB: "IDL COMP LAB",
  SCHOOL_OF_MEDICINE: "SMS",
  E_LEARNING_CENTRE: "E-VBAB",
  LIBRARY_MALL: "KNUST LIBRARY MALL",
  PETROLEUM_BUILDING: "PB-SIM LAB",
};

export const COLLEGE_OF_SCIENCE_ROOMS = {
  GF_19: "GF-19",
  GF_18: "GF-18",
  GF_17: "GF-17",
  FF_1: "FF-1",
  FF_5: "FF-5",
  FF_24: "FF-24",
  SF_1: "SF-1",
  SF_7: "SF-7",
  SF_8: "SF-8",
  SF_19: "SF-19",
  SF_20: "SF-20",
  TF_1: "TF-1",
  TF_34: "TF-34",
};

export const resetPasswordEmailHTML = ({ name, resetURL }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Message</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]--><!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
.es-button-border:hover {
  border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
  background:#ffffff!important;
}
.es-button-border:hover a.es-button,
.es-button-border:hover button.es-button,
.es-button-border:hover label.es-button {
  background:#ffffff!important;
}
td .es-button-border-6958:hover {
  border-color:#006d77!important;
  background:#ffffff!important;
}
.es-button-border:hover a.es-button {
  background:#ffffff!important;
  border-color:#ffffff!important;
}
@media only screen and (max-width:600px) {.es-m-p20b { padding-bottom:20px!important } .es-p-default { } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:20px!important; text-align:center; line-height:120%!important } h2 { font-size:16px!important; text-align:left; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:20px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:16px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:10px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block } .es-spacer { display:inline-table } a.es-button, button.es-button, label.es-button { font-size:14px!important; padding:10px 20px 10px 20px!important; line-height:120%!important } a.es-button, button.es-button, label.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu.es-table-not-adapt { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-adapt-td { display:block!important; width:100%!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-container-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-hidden { display:table-cell!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } h2 a { text-align:left } a.es-button { border-left-width:0px!important; border-right-width:0px!important } .es-text-3924 .es-text-mobile-size-24, .es-text-3924 .es-text-mobile-size-24 * { font-size:24px!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body class="body" style="width:100%;height:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
 <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
   <v:fill type="tile"  color="#fafafa" ></v:fill>
 </v:background>
<![endif]-->
   <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-color:#FAFAFA">
     <tr style="border-collapse:collapse">
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" align="center" class="es-header" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr style="border-collapse:collapse">
          <td align="center" class="es-adaptive" style="padding:0;Margin:0">
           <table cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center" class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3D5CA3;width:600px" role="none">
             <tr style="border-collapse:collapse">
              <td bgcolor="#006d77" align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;background-color:#006d77">
               <table cellspacing="0" cellpadding="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr style="border-collapse:collapse">
                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" class="es-text-3924" style="padding:0;Margin:0"><h1 class="es-text-mobile-size-24" style="Margin:0;font-family:-apple-system, BlinkMacSystemFont, Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:28.8px;color:#ffffff"><strong style="font-weight:700 !important">EXAM ROOM</strong></h1><h1 class="es-text-mobile-size-24" style="Margin:0;font-family:-apple-system, BlinkMacSystemFont, Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:28.8px;color:#ffffff"><strong style="font-weight:700 !important">ALLOCATION SYSTEM</strong></h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellspacing="0" cellpadding="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr style="border-collapse:collapse">
          <td bgcolor="#fafafa" align="center" style="padding:0;Margin:0;background-color:#FAFAFA">
           <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px" role="none">
             <tr style="border-collapse:collapse">
              <td bgcolor="transparent" align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:40px;background-color:transparent;background-position:left top">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" role="presentation">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;font-family:-apple-system, BlinkMacSystemFont, Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#333333"><strong style="font-weight:700 !important">Hi, ${name}</strong></h1></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="left" style="padding:0;Margin:0;padding-right:35px;padding-left:40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:-apple-system, BlinkMacSystemFont, Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';line-height:24px;letter-spacing:0;color:#666666;font-size:16px;text-align:center">There was a request to change your password!</p></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-top:25px;padding-right:40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:-apple-system, BlinkMacSystemFont, Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';line-height:24px;letter-spacing:0;color:#666666;font-size:16px">If you did not make this request, just ignore this email. Otherwise, please click the button below to change your password:</p></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="Margin:0;padding-top:40px;padding-right:10px;padding-bottom:40px;padding-left:10px"><span class="es-button-border es-button-border-6958" style="border-style:solid;border-color:#006d77;background:#ffffff;border-width:2px;display:inline-block;border-radius:10px;width:auto"><a href="${resetURL}" target="_blank" class="es-button" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;font-family:-apple-system, BlinkMacSystemFont, Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;color:#006d77;padding:10px 20px 10px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #FFFFFF">RESET PASSWORD</a></span></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse">
             </tr>
             <tr style="border-collapse:collapse">
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>`;
};
