export const COMPANY_INFO = {
  name: "Sunrise Packers & Movers",
  tagline: "Your Belongings..... Our Responsibility",
  owner: "Praveen Kumar Saket",
  mobile: "8517952427",
  mobileFormatted: "+91 8517952427",
  whatsapp: "+91 8517952427",
  whatsappRaw: "918517952427",
  email: "sunr21963@gmail.com",
  serviceCoverage: "All India",
  address: "Juhi Gaon Hanuman Mandir Kamautha Top Number 2, Near Mansarovar Station, New Mumbai, Maharashtra 410206",
  city: "New Mumbai",
  state: "Maharashtra",
  pincode: "410206",
  landmark: "Near Mansarovar Station, Juhi Gaon Hanuman Mandir Kamautha Top Number 2",
  coordinates: {
    lat: 19.0163,
    lng: 73.0978
  },
  workingHours: "24/7 Customer Support & Moving Assistance",
  establishedNotice: "Reliable & Professional Relocation Services Across India"
};

// Centralized Configurable Business Statistics & Customer Ratings
export const BUSINESS_STATS = {
  // Configurable fields - Unverified numerical achievements remain hidden per requirement
  happyCustomers: {
    enabled: false, // Set to true once verified customer figures are supplied
    count: null,    // e.g. "500+"
    label: "Happy Customers",
    description: "Satisfied Residential & Corporate Clients"
  },
  successfulMoves: {
    enabled: false, // Set to true once verified moves figures are supplied
    count: null,    // e.g. "1,200+"
    label: "Successful Moves",
    description: "Relocations Completed Across India"
  },
  customerRating: {
    enabled: true,  // Display verified 4.5/5 rating
    score: 4.5,
    maxScore: 5,
    isVerified: true,
    reviewCount: null, // Review count will be shown when verified review source count is supplied
    sourceName: "Customer Feedback",
    sourceUrl: null, // Link to genuine review platform (e.g., Google Reviews) when verified
    label: "Customer Rating",
    description: "4.5 / 5 Star Moving Rating"
  },
  allIndiaService: {
    enabled: true,
    title: "All India Service",
    label: "Pan-India Coverage",
    description: "Safe door-to-door transit across all Indian states and cities"
  }
};
