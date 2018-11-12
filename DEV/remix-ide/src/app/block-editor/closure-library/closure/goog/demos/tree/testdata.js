// Copyright 2010 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var testData = [
  "Countries",
  [
    [
      "A",
      [
        ["Afghanistan"],
        ["Albania"],
        ["Algeria"],
        ["American Samoa"],
        ["Andorra"],
        ["Angola"],
        ["Anguilla"],
        ["Antarctica"],
        ["Antigua and Barbuda"],
        ["Argentina"],
        ["Armenia"],
        ["Aruba"],
        ["Australia"],
        ["Austria"],
        ["Azerbaijan"]
      ]
    ],
    [
      "B",
      [
        ["Bahamas"],
        ["Bahrain"],
        ["Bangladesh"],
        ["Barbados"],
        ["Belarus"],
        ["Belgium"],
        ["Belize"],
        ["Benin"],
        ["Bermuda"],
        ["Bhutan"],
        ["Bolivia"],
        ["Bosnia and Herzegovina"],
        ["Botswana"],
        ["Bouvet Island"],
        ["Brazil"],
        ["British Indian Ocean Territory"],
        ["Brunei Darussalam"],
        ["Bulgaria"],
        ["Burkina Faso"],
        ["Burundi"]
      ]
    ],
    [
      "C",
      [
        ["Cambodia"],
        ["Cameroon"],
        ["Canada"],
        ["Cape Verde"],
        ["Cayman Islands"],
        ["Central African Republic"],
        ["Chad"],
        ["Chile"],
        ["China"],
        ["Christmas Island"],
        ["Cocos (Keeling) Islands"],
        ["Colombia"],
        ["Comoros"],
        ["Congo"],
        ["Congo, the Democratic Republic of the"],
        ["Cook Islands"],
        ["Costa Rica"],
        ["Croatia"],
        ["Cuba"],
        ["Cyprus"],
        ["Czech Republic"],
        ["C\u00f4te d\u2019Ivoire"]
      ]
    ],
    ["D", [["Denmark"], ["Djibouti"], ["Dominica"], ["Dominican Republic"]]],
    [
      "E",
      [
        ["Ecuador"],
        ["Egypt"],
        ["El Salvador"],
        ["Equatorial Guinea"],
        ["Eritrea"],
        ["Estonia"],
        ["Ethiopia"]
      ]
    ],
    [
      "F",
      [
        ["Falkland Islands (Malvinas)"],
        ["Faroe Islands"],
        ["Fiji"],
        ["Finland"],
        ["France"],
        ["French Guiana"],
        ["French Polynesia"],
        ["French Southern Territories"]
      ]
    ],
    [
      "G",
      [
        ["Gabon"],
        ["Gambia"],
        ["Georgia"],
        ["Germany"],
        ["Ghana"],
        ["Gibraltar"],
        ["Greece"],
        ["Greenland"],
        ["Grenada"],
        ["Guadeloupe"],
        ["Guam"],
        ["Guatemala"],
        ["Guernsey"],
        ["Guinea"],
        ["Guinea-Bissau"],
        ["Guyana"]
      ]
    ],
    [
      "H",
      [
        ["Haiti"],
        ["Heard Island and McDonald Islands"],
        ["Holy See (Vatican City State)"],
        ["Honduras"],
        ["Hong Kong"],
        ["Hungary"]
      ]
    ],
    [
      "I",
      [
        ["Iceland"],
        ["India"],
        ["Indonesia"],
        ["Iran, Islamic Republic of"],
        ["Iraq"],
        ["Ireland"],
        ["Isle of Man"],
        ["Israel"],
        ["Italy"]
      ]
    ],
    ["J", [["Jamaica"], ["Japan"], ["Jersey"], ["Jordan"]]],
    [
      "K",
      [
        ["Kazakhstan"],
        ["Kenya"],
        ["Kiribati"],
        ["Korea, Democratic People\u2019s Republic of"],
        ["Korea, Republic of"],
        ["Kuwait"],
        ["Kyrgyzstan"]
      ]
    ],
    [
      "L",
      [
        ["Lao People\u2019s Democratic Republic"],
        ["Latvia"],
        ["Lebanon"],
        ["Lesotho"],
        ["Liberia"],
        ["Libyan Arab Jamahiriya"],
        ["Liechtenstein"],
        ["Lithuania"],
        ["Luxembourg"]
      ]
    ],
    [
      "M",
      [
        ["Macao"],
        ["Macedonia, the former Yugoslav Republic of"],
        ["Madagascar"],
        ["Malawi"],
        ["Malaysia"],
        ["Maldives"],
        ["Mali"],
        ["Malta"],
        ["Marshall Islands"],
        ["Martinique"],
        ["Mauritania"],
        ["Mauritius"],
        ["Mayotte"],
        ["Mexico"],
        ["Micronesia, Federated States of"],
        ["Moldova, Republic of"],
        ["Monaco"],
        ["Mongolia"],
        ["Montenegro"],
        ["Montserrat"],
        ["Morocco"],
        ["Mozambique"],
        ["Myanmar"]
      ]
    ],
    [
      "N",
      [
        ["Namibia"],
        ["Nauru"],
        ["Nepal"],
        ["Netherlands"],
        ["Netherlands Antilles"],
        ["New Caledonia"],
        ["New Zealand"],
        ["Nicaragua"],
        ["Niger"],
        ["Nigeria"],
        ["Niue"],
        ["Norfolk Island"],
        ["Northern Mariana Islands"],
        ["Norway"]
      ]
    ],
    ["O", [["Oman"]]],
    [
      "P",
      [
        ["Pakistan"],
        ["Palau"],
        ["Palestinian Territory, Occupied"],
        ["Panama"],
        ["Papua New Guinea"],
        ["Paraguay"],
        ["Peru"],
        ["Philippines"],
        ["Pitcairn"],
        ["Poland"],
        ["Portugal"],
        ["Puerto Rico"]
      ]
    ],
    ["Q", [["Qatar"]]],
    ["R", [["Romania"], ["Russian Federation"], ["Rwanda"], ["R\u00e9union"]]],
    [
      "S",
      [
        ["Saint Barth\u00e9lemy"],
        ["Saint Helena"],
        ["Saint Kitts and Nevis"],
        ["Saint Lucia"],
        ["Saint Martin (French part)"],
        ["Saint Pierre and Miquelon"],
        ["Saint Vincent and the Grenadines"],
        ["Samoa"],
        ["San Marino"],
        ["Sao Tome and Principe"],
        ["Saudi Arabia"],
        ["Senegal"],
        ["Serbia"],
        ["Seychelles"],
        ["Sierra Leone"],
        ["Singapore"],
        ["Slovakia"],
        ["Slovenia"],
        ["Solomon Islands"],
        ["Somalia"],
        ["South Africa"],
        ["South Georgia and the South Sandwich Islands"],
        ["Spain"],
        ["Sri Lanka"],
        ["Sudan"],
        ["Suriname"],
        ["Svalbard and Jan Mayen"],
        ["Swaziland"],
        ["Sweden"],
        ["Switzerland"],
        ["Syrian Arab Republic"]
      ]
    ],
    [
      "T",
      [
        ["Taiwan, Province of China"],
        ["Tajikistan"],
        ["Tanzania, United Republic of"],
        ["Thailand"],
        ["Timor-Leste"],
        ["Togo"],
        ["Tokelau"],
        ["Tonga"],
        ["Trinidad and Tobago"],
        ["Tunisia"],
        ["Turkey"],
        ["Turkmenistan"],
        ["Turks and Caicos Islands"],
        ["Tuvalu"]
      ]
    ],
    [
      "U",
      [
        ["Uganda"],
        ["Ukraine"],
        ["United Arab Emirates"],
        ["United Kingdom"],
        ["United States"],
        ["United States Minor Outlying Islands"],
        ["Uruguay"],
        ["Uzbekistan"]
      ]
    ],
    [
      "V",
      [
        ["Vanuatu"],
        ["Venezuela"],
        ["Viet Nam"],
        ["Virgin Islands, British"],
        ["Virgin Islands, U.S."]
      ]
    ],
    ["W", [["Wallis and Futuna"], ["Western Sahara"]]],
    ["Y", [["Yemen"]]],
    ["Z", [["Zambia"], ["Zimbabwe"]]],
    ["\u00c5", [["\u00c5land Islands"]]]
  ]
]
