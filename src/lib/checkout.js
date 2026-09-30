export const DISTRICTS = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chapainawabganj",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

// +8801XXXXXXXXX / 8801XXXXXXXXX / 01XXXXXXXXX -> 01XXXXXXXXX
export function normalizePhone(input = "") {
  let p = String(input).replace(/[^\d+]/g, "");
  if (p.startsWith("+88")) p = p.slice(3);
  else if (p.startsWith("88") && p.length === 13) p = p.slice(2);
  return p;
}

export function validateCheckout(f = {}) {
  const errors = {};
  const name = String(f.name || "").trim();
  const address = String(f.address || "").trim();
  const email = String(f.email || "").trim();

  if (name.length < 2 || name.length > 80)
    errors.name = "Apnar poorno naam likhun.";
  if (!/^01[3-9]\d{8}$/.test(normalizePhone(f.phone)))
    errors.phone = "Sothik mobile number din (jemon 01712345678).";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Email thik nei.";
  if (!DISTRICTS.includes(f.district))
    errors.district = "District select korun.";
  if (address.length < 10 || address.length > 250)
    errors.address =
      "Bari/road/thana shoho puro thikana likhun (kom-pokkhe 10 okkhor).";
  if (String(f.note || "").length > 500)
    errors.note = "Note 500 okkhorer moddhe rakhun.";

  return errors;
}
