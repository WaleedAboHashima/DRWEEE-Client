import Cookies from "universal-cookie";

export const baseURL = "https://drweee.onrender.com";
// export const baseURL = "http://localhost:8000";
export default [
  { name: "Afghanistan", arabicName: "أفغانستان", shortcut: "AF" },
  { name: "Albania", arabicName: "ألبانيا", shortcut: "AL" },
  { name: "Algeria", arabicName: "الجزائر", shortcut: "DZ" },
  { name: "Andorra", arabicName: "أندورا", shortcut: "AD" },
  { name: "Angola", arabicName: "أنغولا", shortcut: "AO" },
  {
    name: "Antigua and Barbuda",
    arabicName: "أنتيغوا وبربودا",
    shortcut: "AG",
  },
  { name: "Argentina", arabicName: "الأرجنتين", shortcut: "AR" },
  { name: "Armenia", arabicName: "أرمينيا", shortcut: "AM" },
  { name: "Australia", arabicName: "أستراليا", shortcut: "AU" },
  { name: "Austria", arabicName: "النمسا", shortcut: "AT" },
  { name: "Azerbaijan", arabicName: "أذربيجان", shortcut: "AZ" },
  { name: "Bahamas", arabicName: "الباهاما", shortcut: "BS" },
  { name: "Bahrain", arabicName: "البحرين", shortcut: "BH" },
  { name: "Bangladesh", arabicName: "بنغلاديش", shortcut: "BD" },
  { name: "Barbados", arabicName: "بربادوس", shortcut: "BB" },
  { name: "Belarus", arabicName: "بيلاروسيا", shortcut: "BY" },
  { name: "Belgium", arabicName: "بلجيكا", shortcut: "BE" },
  { name: "Belize", arabicName: "بليز", shortcut: "BZ" },
  { name: "Benin", arabicName: "بنين", shortcut: "BJ" },
  { name: "Bhutan", arabicName: "بوتان", shortcut: "BT" },
  { name: "Bolivia", arabicName: "بوليفيا", shortcut: "BO" },
  {
    name: "Bosnia and Herzegovina",
    arabicName: "البوسنة والهرسك",
    shortcut: "BA",
  },
  { name: "Botswana", arabicName: "بوتسوانا", shortcut: "BW" },
  { name: "Brazil", arabicName: "البرازيل", shortcut: "BR" },
  { name: "Brunei", arabicName: "بروناي", shortcut: "BN" },
  { name: "Bulgaria", arabicName: "بلغاريا", shortcut: "BG" },
  { name: "Burkina Faso", arabicName: "بوركينا فاسو", shortcut: "BF" },
  { name: "Burundi", arabicName: "بوروندي", shortcut: "BI" },
  { name: "Cambodia", arabicName: "كمبوديا", shortcut: "KH" },
  { name: "Cameroon", arabicName: "الكاميرون", shortcut: "CM" },
  { name: "Canada", arabicName: "كندا", shortcut: "CA" },
  { name: "Cape Verde", arabicName: "الرأس الأخضر", shortcut: "CV" },
  {
    name: "Central African Republic",
    arabicName: "جمهورية أفريقيا الوسطى",
    shortcut: "CF",
  },
  { name: "Chad", arabicName: "تشاد", shortcut: "TD" },
  { name: "Chile", arabicName: "تشيلي", shortcut: "CL" },
  { name: "China", arabicName: "الصين", shortcut: "CN" },
  { name: "Colombia", arabicName: "كولومبيا", shortcut: "CO" },
  { name: "Comoros", arabicName: "جزر القمر", shortcut: "KM" },
  { name: "Congo", arabicName: "الكونغو", shortcut: "CG" },
  { name: "Costa Rica", arabicName: "كوستاريكا", shortcut: "CR" },
  { name: "Croatia", arabicName: "كرواتيا", shortcut: "HR" },
  { name: "Cuba", arabicName: "كوبا", shortcut: "CU" },
  { name: "Cyprus", arabicName: "قبرص", shortcut: "CY" },
  { name: "Czech Republic", arabicName: "جمهورية التشيك", shortcut: "CZ" },
  { name: "Denmark", arabicName: "الدانمارك", shortcut: "DK" },
  { name: "Djibouti", arabicName: "جيبوتي", shortcut: "DJ" },
  { name: "Dominica", arabicName: "دومينيكا", shortcut: "DM" },
  {
    name: "Dominican Republic",
    arabicName: "جمهورية الدومينيكان",
    shortcut: "DO",
  },
  { name: "East Timor", arabicName: "تيمور الشرقية", shortcut: "TL" },
  { name: "Ecuador", arabicName: "الإكوادور", shortcut: "EC" },
  { name: "Egypt", arabicName: "مصر", shortcut: "EG" },
  { name: "El Salvador", arabicName: "السلفادور", shortcut: "SV" },
  { name: "Equatorial Guinea", arabicName: "غينيا الاستوائية", shortcut: "GQ" },
  { name: "Eritrea", arabicName: "إريتريا", shortcut: "ER" },
  { name: "Estonia", arabicName: "إستونيا", shortcut: "EE" },
  { name: "Eswatini", arabicName: "إسواتيني", shortcut: "SZ" },
  { name: "Ethiopia", arabicName: "إثيوبيا", shortcut: "ET" },
  { name: "Fiji", arabicName: "فيجي", shortcut: "FJ" },
  { name: "Finland", arabicName: "فنلندا", shortcut: "FI" },
  { name: "France", arabicName: "فرنسا", shortcut: "FR" },
  { name: "Gabon", arabicName: "الغابون", shortcut: "GA" },
  { name: "Gambia", arabicName: "غامبيا", shortcut: "GM" },
  { name: "Georgia", arabicName: "جورجيا", shortcut: "GE" },
  { name: "Germany", arabicName: "ألمانيا", shortcut: "DE" },
  { name: "Ghana", arabicName: "غانا", shortcut: "GH" },
  { name: "Greece", arabicName: "اليونان", shortcut: "GR" },
  { name: "Grenada", arabicName: "غرينادا", shortcut: "GD" },
  { name: "Guatemala", arabicName: "غواتيمالا", shortcut: "GT" },
  { name: "Guinea", arabicName: "غينيا", shortcut: "GN" },
  { name: "Guinea-Bissau", arabicName: "غينيا-بيساو", shortcut: "GW" },
  { name: "Guyana", arabicName: "غيانا", shortcut: "GY" },
  { name: "Haiti", arabicName: "هايتي", shortcut: "HT" },
  { name: "Honduras", arabicName: "هندوراس", shortcut: "HN" },
  { name: "Hungary", arabicName: "المجر", shortcut: "HU" },
  { name: "Iceland", arabicName: "آيسلندا", shortcut: "IS" },
  { name: "India", arabicName: "الهند", shortcut: "IN" },
  { name: "Indonesia", arabicName: "إندونيسيا", shortcut: "ID" },
  { name: "Iran", arabicName: "إيران", shortcut: "IR" },
  { name: "Iraq", arabicName: "العراق", shortcut: "IQ" },
  { name: "Ireland", arabicName: "أيرلندا", shortcut: "IE" },
  { name: "Israel", arabicName: "إسرائيل", shortcut: "IL" },
  { name: "Italy", arabicName: "إيطاليا", shortcut: "IT" },
  { name: "Jamaica", arabicName: "جامايكا", shortcut: "JM" },
  { name: "Japan", arabicName: "اليابان", shortcut: "JP" },
  { name: "Jordan", arabicName: "الأردن", shortcut: "JO" },
  { name: "Kazakhstan", arabicName: "كازاخستان", shortcut: "KZ" },
  { name: "Kenya", arabicName: "كينيا", shortcut: "KE" },
  { name: "Kiribati", arabicName: "كيريباتي", shortcut: "KI" },
  { name: "Korea, North", arabicName: "كوريا الشمالية", shortcut: "KP" },
  { name: "Korea, South", arabicName: "كوريا الجنوبية", shortcut: "KR" },
  { name: "Kosovo", arabicName: "كوسوفو", shortcut: "XK" },
  { name: "Kuwait", arabicName: "الكويت", shortcut: "KW" },
  { name: "Kyrgyzstan", arabicName: "قرغيزستان", shortcut: "KG" },
  { name: "Laos", arabicName: "لاوس", shortcut: "LA" },
  { name: "Latvia", arabicName: "لاتفيا", shortcut: "LV" },
  { name: "Lebanon", arabicName: "لبنان", shortcut: "LB" },
  { name: "Lesotho", arabicName: "ليسوتو", shortcut: "LS" },
  { name: "Liberia", arabicName: "ليبيريا", shortcut: "LR" },
  { name: "Libya", arabicName: "ليبيا", shortcut: "LY" },
  { name: "Liechtenstein", arabicName: "ليختنشتين", shortcut: "LI" },
  { name: "Lithuania", arabicName: "ليتوانيا", shortcut: "LT" },
  { name: "Luxembourg", arabicName: "لوكسمبورغ", shortcut: "LU" },
  { name: "Madagascar", arabicName: "مدغشقر", shortcut: "MG" },
  { name: "Malawi", arabicName: "مالاوي", shortcut: "MW" },
  { name: "Malaysia", arabicName: "ماليزيا", shortcut: "MY" },
  { name: "Maldives", arabicName: "المالديف", shortcut: "MV" },
  { name: "Mali", arabicName: "مالي", shortcut: "ML" },
  { name: "Malta", arabicName: "مالطا", shortcut: "MT" },
  { name: "Marshall Islands", arabicName: "جزر مارشال", shortcut: "MH" },
  { name: "Mauritania", arabicName: "موريتانيا", shortcut: "MR" },
  { name: "Mauritius", arabicName: "موريشيوس", shortcut: "MU" },
  { name: "Mexico", arabicName: "المكسيك", shortcut: "MX" },
  { name: "Micronesia", arabicName: "مايكرونيزيا", shortcut: "FM" },
  { name: "Moldova", arabicName: "مولدوفا", shortcut: "MD" },
  { name: "Monaco", arabicName: "موناكو", shortcut: "MC" },
  { name: "Mongolia", arabicName: "منغوليا", shortcut: "MN" },
  { name: "Montenegro", arabicName: "الجبل الأسود", shortcut: "ME" },
  { name: "Morocco", arabicName: "المغرب", shortcut: "MA" },
  { name: "Mozambique", arabicName: "موزمبيق", shortcut: "MZ" },
  { name: "Myanmar", arabicName: "ميانمار", shortcut: "MM" },
  { name: "Namibia", arabicName: "ناميبيا", shortcut: "NA" },
  { name: "Nauru", arabicName: "ناورو", shortcut: "NR" },
  { name: "Nepal", arabicName: "نيبال", shortcut: "NP" },
  { name: "Netherlands", arabicName: "هولندا", shortcut: "NL" },
  { name: "New Zealand", arabicName: "نيوزيلندا", shortcut: "NZ" },
  { name: "Nicaragua", arabicName: "نيكاراغوا", shortcut: "NI" },
  { name: "Niger", arabicName: "النيجر", shortcut: "NE" },
  { name: "Nigeria", arabicName: "نيجيريا", shortcut: "NG" },
  { name: "North Macedonia", arabicName: "مقدونيا الشمالية", shortcut: "MK" },
  { name: "Norway", arabicName: "النرويج", shortcut: "NO" },
  { name: "Oman", arabicName: "عمان", shortcut: "OM" },
  { name: "Pakistan", arabicName: "باكستان", shortcut: "PK" },
  { name: "Palau", arabicName: "بالاو", shortcut: "PW" },
  { name: "Palestine", arabicName: "فلسطين", shortcut: "PS" },
  { name: "Panama", arabicName: "بنما", shortcut: "PA" },
  {
    name: "Papua New Guinea",
    arabicName: "بابوا غينيا الجديدة",
    shortcut: "PG",
  },
  { name: "Paraguay", arabicName: "باراغواي", shortcut: "PY" },
  { name: "Peru", arabicName: "بيرو", shortcut: "PE" },
  { name: "Philippines", arabicName: "الفلبين", shortcut: "PH" },
  { name: "Poland", arabicName: "بولندا", shortcut: "PL" },
  { name: "Portugal", arabicName: "البرتغال", shortcut: "PT" },
  { name: "Qatar", arabicName: "قطر", shortcut: "QA" },
  { name: "Romania", arabicName: "رومانيا", shortcut: "RO" },
  { name: "Russia", arabicName: "روسيا", shortcut: "RU" },
  { name: "Rwanda", arabicName: "رواندا", shortcut: "RW" },
  {
    name: "Saint Kitts and Nevis",
    arabicName: "سانت كيتس ونيفيس",
    shortcut: "KN",
  },
  { name: "Saint Lucia", arabicName: "سانت لوسيا", shortcut: "LC" },
  {
    name: "Saint Vincent and the Grenadines",
    arabicName: "سانت فينسنت وجزر غرينادين",
    shortcut: "VC",
  },
  { name: "Samoa", arabicName: "ساموا", shortcut: "WS" },
  { name: "San Marino", arabicName: "سان مارينو", shortcut: "SM" },
  {
    name: "Sao Tome and Principe",
    arabicName: "ساو تومي وبرينسيبي",
    shortcut: "ST",
  },
  {
    name: "Saudi Arabia",
    arabicName: "المملكة العربية السعودية",
    shortcut: "SA",
  },
  { name: "Senegal", arabicName: "السنغال", shortcut: "SN" },
  { name: "Serbia", arabicName: "صربيا", shortcut: "RS" },
  { name: "Seychelles", arabicName: "سيشل", shortcut: "SC" },
  { name: "Sierra Leone", arabicName: "سيراليون", shortcut: "SL" },
  { name: "Singapore", arabicName: "سنغافورة", shortcut: "SG" },
  { name: "Slovakia", arabicName: "سلوفاكيا", shortcut: "SK" },
  { name: "Slovenia", arabicName: "سلوفينيا", shortcut: "SI" },
  { name: "Solomon Islands", arabicName: "جزر سليمان", shortcut: "SB" },
  { name: "Somalia", arabicName: "الصومال", shortcut: "SO" },
  { name: "South Africa", arabicName: "جنوب أفريقيا", shortcut: "ZA" },
  { name: "South Sudan", arabicName: "جنوب السودان", shortcut: "SS" },
  { name: "Spain", arabicName: "إسبانيا", shortcut: "ES" },
  { name: "Sri Lanka", arabicName: "سيريلانكا", shortcut: "LK" },
  { name: "Sudan", arabicName: "السودان", shortcut: "SD" },
  { name: "Suriname", arabicName: "سورينام", shortcut: "SR" },
  { name: "Swaziland", arabicName: "سوازيلاند", shortcut: "SZ" },
  { name: "Sweden", arabicName: "السويد", shortcut: "SE" },
  { name: "Switzerland", arabicName: "سويسرا", shortcut: "CH" },
  { name: "Syria", arabicName: "سوريا", shortcut: "SY" },
  { name: "Taiwan", arabicName: "تايوان", shortcut: "TW" },
  { name: "Tajikistan", arabicName: "طاجيكستان", shortcut: "TJ" },
  { name: "Tanzania", arabicName: "تنزانيا", shortcut: "TZ" },
  { name: "Thailand", arabicName: "تايلاند", shortcut: "TH" },
  { name: "Togo", arabicName: "توجو", shortcut: "TG" },
  { name: "Tonga", arabicName: "تونغا", shortcut: "TO" },
  {
    name: "Trinidad and Tobago",
    arabicName: "ترينداد وتوباغو",
    shortcut: "TT",
  },
  { name: "Tunisia", arabicName: "تونس", shortcut: "TN" },
  { name: "Turkey", arabicName: "تركيا", shortcut: "TR" },
  { name: "Turkmenistan", arabicName: "تركمانستان", shortcut: "TM" },
  { name: "Tuvalu", arabicName: "توفالو", shortcut: "TV" },
  { name: "Uganda", arabicName: "أوغندا", shortcut: "UG" },
  { name: "Ukraine", arabicName: "أوكرانيا", shortcut: "UA" },
  {
    name: "United Arab Emirates",
    arabicName: "الإمارات العربية المتحدة",
    shortcut: "AE",
  },
  { name: "United Kingdom", arabicName: "المملكة المتحدة", shortcut: "GB" },
  { name: "United States", arabicName: "الولايات المتحدة", shortcut: "US" },
  { name: "Uruguay", arabicName: "أوروغواي", shortcut: "UY" },
  { name: "Uzbekistan", arabicName: "أوزبكستان", shortcut: "UZ" },
  { name: "Vanuatu", arabicName: "فانواتو", shortcut: "VU" },
  { name: "Vatican City", arabicName: "الفاتيكان", shortcut: "VA" },
  { name: "Venezuela", arabicName: "فنزويلا", shortcut: "VE" },
  { name: "Vietnam", arabicName: "فيتنام", shortcut: "VN" },
  { name: "Yemen", arabicName: "اليمن", shortcut: "YE" },
  { name: "Zambia", arabicName: "زامبيا", shortcut: "ZM" },
  { name: "Zimbabwe", arabicName: "زيمبابوي", shortcut: "ZW" },
];

export const currencies = [
  { name: "United States Dollar", code: "USD" },
  { name: "Euro", code: "EUR" },
  { name: "Japanese Yen", code: "JPY" },
  { name: "British Pound Sterling", code: "GBP" },
  { name: "Swiss Franc", code: "CHF" },
  { name: "Canadian Dollar", code: "CAD" },
  { name: "Australian Dollar", code: "AUD" },
  { name: "Chinese Yuan Renminbi", code: "CNY" },
  { name: "Egyptian Pounds", code: "EGP" },
];

export const egyptGovernorates = [
  {
    governorate: "Alexandria",
    governoratear: "الإسكندرية",
    cities: ["Alexandria City", "Borg El Arab", "Abu Qir", "Rosetta"],
    citiesar: ["مدينة الإسكندرية", "برج العرب", "أبو قير", "روزيتا"],
  },
  {
    governorate: "Aswan",
    governoratear: "أسوان",
    cities: ["Aswan City", "Kom Ombo", "Edfu"],
    citiesar: ["مدينة أسوان", "كوم أمبو", "إدفو"],
  },
  {
    governorate: "Asyut",
    governoratear: "أسيوط",
    cities: ["Asyut City", "Dairut", "Sohag"],
    citiesar: ["مدينة أسيوط", "ديروط", "سوهاج"],
  },
  {
    governorate: "Beheira",
    governoratear: "البحيرة",
    cities: ["Damanhur", "Rashid", "Kafr El Dawar"],
    citiesar: ["دمنهور", "رشيد", "كفر الدوار"],
  },
  {
    governorate: "Beni Suef",
    governoratear: "بني سويف",
    cities: ["Beni Suef City", "Minya Al Qamh", "Biba"],
    citiesar: ["مدينة بني سويف", "منية القمح", "بيبا"],
  },
  {
    governorate: "Cairo",
    governoratear: "القاهرة",
    cities: ["Cairo City", "Giza", "6th of October City", "Heliopolis"],
    citiesar: ["مدينة القاهرة", "الجيزة", "مدينة 6 أكتوبر", "مصر الجديدة"],
  },
  {
    governorate: "Dakahlia",
    governoratear: "الدقهلية",
    cities: ["Mansoura", "Matareya", "Mit Ghamr"],
    citiesar: ["المنصورة", "المطرية", "ميت غمر"],
  },
  {
    governorate: "Damietta",
    governoratear: "دمياط",
    cities: ["Damietta City", "New Damietta", "Kafr Saad"],
    citiesar: ["مدينة دمياط", "دمياط الجديدة", "كفر سعد"],
  },
  {
    governorate: "Fayoum",
    governoratear: "الفيوم",
    cities: ["Fayoum City", "Tamiya", "Ibsheway"],
    citiesar: ["مدينة الفيوم", "طميا", "إبشواي"],
  },
  {
    governorate: "Gharbia",
    governoratear: "الغربية",
    cities: ["Tanta", "Kafr El Zayat", "Mahalla El Kubra", "Zefta"],
    citiesar: ["طنطا", "كفر الزيات", "المحلة الكبرى", "زفتى"],
  },
  {
    governorate: "Giza",
    governoratear: "الجيزة",
    cities: ["Giza City", "6th of October City", "Sheikh Zayed City"],
    citiesar: ["مدينة الجيزة", "مدينة 6 أكتوبر", "مدينة الشيخ زايد"],
  },
  {
    governorate: "Ismailia",
    governoratear: "الإسماعيلية",
    cities: ["Ismailia City", "Fayed", "Qantara"],
    citiesar: ["مدينة الإسماعيلية", "الفيض", "القنطرة"],
  },
  {
    governorate: "Kafr El Sheikh",
    governoratear: "كفر الشيخ",
    cities: ["Kafr El Sheikh City", "Desouk", "Ras El Bar"],
    citiesar: ["مدينة كفر الشيخ", "دسوق", "رأس البر"],
  },
  {
    governorate: "Luxor",
    governoratear: "الأقصر",
    cities: ["Luxor City", "Karnak", "Armant"],
    citiesar: ["مدينة الأقصر", "كرنك", "أرمنت"],
  },
  {
    governorate: "Matrouh",
    governoratear: "مطروح",
    cities: ["Marsa Matrouh", "El Alamein", "Siwa"],
    citiesar: ["مرسى مطروح", "العلمين", "سيوة"],
  },
  {
    governorate: "Minya",
    governoratear: "المنيا",
    cities: ["Minya City", "Beni Mazar", "Maghagha"],
    citiesar: ["مدينة المنيا", "بني مزار", "مغاغة"],
  },
  {
    governorate: "Monufia",
    governoratear: "المنوفية",
    cities: ["Shebin El Koum", "Sadat City", "Ashmoun"],
    citiesar: ["شبين الكوم", "مدينة سادات", "أشمون"],
  },
  {
    governorate: "New Valley",
    governoratear: "الوادي الجديد",
    cities: ["Kharga", "Dakhla", "Farafra"],
    citiesar: ["الخارجة", "الداخلة", "الفرافرة"],
  },
  {
    governorate: "North Sinai",
    governoratear: "شمال سيناء",
    cities: ["Arish", "Rafah", "Bir al-Abed"],
    citiesar: ["العريش", "رفح", "بئر العبد"],
  },
  {
    governorate: "Port Said",
    governoratear: "بورسعيد",
    cities: ["Port Said City", "Port Fuad"],
    citiesar: ["مدينة بورسعيد", "بورفؤاد"],
  },
  {
    governorate: "Qalyubia",
    governoratear: "القليوبية",
    cities: ["Banha", "Qalyub", "Shibin El Qanater"],
    citiesar: ["بنها", "قليوب", "شبين القناطر"],
  },
  {
    governorate: "Qena",
    governoratear: "قنا",
    cities: ["Qena City", "Luxor", "Dendera"],
    citiesar: ["مدينة قنا", "الأقصر", "دندرة"],
  },
  {
    governorate: "Red Sea",
    governoratear: "البحر الأحمر",
    cities: ["Hurghada", "Sharm El Sheikh", "Marsa Alam"],
    citiesar: ["الغردقة", "شرم الشيخ", "مرسى علم"],
  },
  {
    governorate: "Sharqia",
    governoratear: "الشرقية",
    cities: ["Zagazig", "Mansoura", "Ismailia"],
    citiesar: ["الزقازيق", "المنصورة", "الإسماعيلية"],
  },
  {
    governorate: "Sohag",
    governoratear: "سوهاج",
    cities: ["Sohag City", "Akhmim", "Girga"],
    citiesar: ["مدينة سوهاج", "أخميم", "جرجا"],
  },
  {
    governorate: "South Sinai",
    governoratear: "جنوب سيناء",
    cities: ["Sharm El Sheikh", "Dahab", "Saint Catherine"],
    citiesar: ["شرم الشيخ", "دهب", "سانت كاترين"],
  },
  // Add Arabic names for other governorates and cities as needed
];

export const Cookie = new Cookies();