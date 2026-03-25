export interface AreaData {
  slug: string;
  city: string;
  county: string;
  region: 'midWillametteValley' | 'harneyCounty';
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  protectionTitle: string;
  protectionDescription: string;
  protectionFeatures: string[];
  localCommunities: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  caseStudy?: {
    title: string;
    description: string;
    imageUrl: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    authorTitle: string;
  };
}

export const AREA_DATA: Record<string, AreaData> = {
  albany: {
    slug: 'albany',
    city: 'Albany',
    county: 'Linn',
    region: 'midWillametteValley',
    title: 'Albany Oregon Home Maintenance | Benson Home Solutions',
    description: 'Expert home maintenance and emergency restoration in Albany, Oregon. Licensed contractor (CCB #258533) specializing in data-backed property protection.',
    heroTitle: 'Albany\'s Scientific',
    heroSubtitle: 'Property Care Specialists.',
    heroDescription: 'Preserving Albany\'s residential and commercial assets through building science and precision maintenance.',
    protectionTitle: 'Linn County Asset Protection',
    protectionDescription: 'Albany properties face unique moisture challenges. Our building science assessments and maintenance plans are engineered to stop rot before it starts.',
    protectionFeatures: ['Rapid Emergency Response', 'Monthly Protection Plans', 'Detailed Digital Documentation', 'Advanced Moisture Detection'],
    localCommunities: ['Albany', 'Millersburg', 'Tangest', 'Jefferson', 'Lebanon', 'Sweet Home'],
    coordinates: { lat: 44.6365, lng: -123.1059 },
    caseStudy: {
      title: 'Historic Downtown Albany Restoration',
      description: 'A complete exterior restoration of a historic downtown Albany building, including window and door replacement, siding repair, and a new roof.',
      imageUrl: '/images/case-studies/albany-downtown.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions saved our historic building. Their attention to detail and craftsmanship is unmatched.',
      author: 'John Doe',
      authorTitle: 'President, Albany Historical Society'
    }
  },
  lebanon: {
    slug: 'lebanon',
    city: 'Lebanon',
    county: 'Linn',
    region: 'midWillametteValley',
    title: 'Lebanon Oregon Home Maintenance | Benson Home Solutions',
    description: 'Professional property maintenance and emergency restoration in Lebanon, Oregon. Licensed contractor (CCB #258533) serving East Linn County.',
    heroTitle: 'Lebanon\'s Trusted',
    heroSubtitle: 'Maintenance Force.',
    heroDescription: 'Dedicated property care for Lebanon and East Linn County. From seasonal prep to emergency response.',
    protectionTitle: 'East Linn Asset Care',
    protectionDescription: 'Lebanon homes require specialized attention to prevent moisture intrusion and structural decay in the Valley climate.',
    protectionFeatures: ['Precision Moisture Audits', 'Gutter & Roof Defense', 'Local Emergency Teams', 'Subscription Maintenance'],
    localCommunities: ['Lebanon', 'Sweet Home', 'Sodaville', 'Waterloo', 'Brownsville'],
    coordinates: { lat: 44.5365, lng: -122.9073 },
    caseStudy: {
      title: 'Agricultural Building Restoration',
      description: 'A complete exterior restoration of a large agricultural building in Lebanon, including a new roof and siding.',
      imageUrl: '/images/case-studies/lebanon-farm.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions did a great job on our barn. They were fast, efficient, and affordable.',
      author: 'Jane Smith',
      authorTitle: 'Owner, Smith Family Farms'
    }
  },
  'sweet-home': {
    slug: 'sweet-home',
    city: 'Sweet Home',
    county: 'Linn',
    region: 'midWillametteValley',
    title: 'Sweet Home Oregon Property Care | Benson Home Solutions',
    description: 'Specialized home maintenance and restoration in Sweet Home, Oregon. High-standard property protection for the Gateway to the Santiam.',
    heroTitle: 'Sweet Home\'s',
    heroSubtitle: 'Guardian Teams.',
    heroDescription: 'Protecting properties at the edge of the Cascades with scientific accuracy and local expertise.',
    protectionTitle: 'Santiam Valley Resilience',
    protectionDescription: 'Sweet Home properties face diverse conditions. Our maintenance programs are designed for the unique challenges of the Santiam area.',
    protectionFeatures: ['Cascade Edge Protection', 'Rapid Storm Response', 'Wildfire Defensible Space', 'Expert Leak Detection'],
    localCommunities: ['Sweet Home', 'Foster', 'Cascadia', 'Lebanon', 'Crawfordsville'],
    coordinates: { lat: 44.3976, lng: -122.7362 },
    caseStudy: {
      title: 'Mountain Cabin Winterization',
      description: 'A complete winterization of a mountain cabin in Sweet Home, including insulation, and a new wood stove.',
      imageUrl: '/images/case-studies/sweet-home-cabin.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions made sure our cabin was ready for winter. We couldn\'t be happier with the results.',
      author: 'Bob Johnson',
      authorTitle: 'Cabin Owner'
    }
  },
  burns: {
    slug: 'burns',
    city: 'Burns',
    county: 'Harney',
    region: 'harneyCounty',
    title: 'Burns & Harney County Maintenance | Benson Home Solutions',
    description: 'High-desert property maintenance and winterization in Burns and Harney County. Specialized audits for wildfire hardening and extreme temperature protection. CCB #258533.',
    heroTitle: 'High Desert',
    heroSubtitle: 'Asset Protection.',
    heroDescription: 'From the freezes of Drewsey to the summer heat of Burns, we provide the specialized high-desert maintenance required to preserve your property.',
    protectionTitle: 'Extreme Climate Strategy',
    protectionDescription: 'Harney County properties face extreme temperature swings and wildfire risk. Our methodology focuses on thermal efficiency, winterization, and wildfire hardening.',
    protectionFeatures: ['Wildfire Hardening Audits', 'Deep Freeze Winterization', 'Commercial Asset Management', 'Ecclesiastical Preservation'],
    localCommunities: ['Burns', 'Hines', 'Riley', 'Drewsey', 'Denio', 'McDermitt'],
    coordinates: { lat: 43.5863, lng: -119.0544 },
    caseStudy: {
      title: 'Ranch House Wildfire Hardening',
      description: 'A complete wildfire hardening of a ranch house in Burns, including a new metal roof, fire-resistant siding, and a defensible space.',
      imageUrl: '/images/case-studies/burns-ranch.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions gave us peace of mind. Our ranch is now protected from wildfires.',
      author: 'Mary Brown',
      authorTitle: 'Ranch Owner'
    }
  },
  hines: {
    slug: 'hines',
    city: 'Hines',
    county: 'Harney',
    region: 'harneyCounty',
    title: 'Hines Oregon High-Desert Maintenance | Benson Home Solutions',
    description: 'Expert property maintenance and winterization in Hines, Oregon. Specialized audits and extreme temperature protection.',
    heroTitle: 'Hines\'s High',
    heroSubtitle: 'Desert Guardians.',
    heroDescription: 'Dedicated property care for Hines residential and commercial assets in the heart of Harney County.',
    protectionTitle: 'Harney Resilience',
    protectionDescription: 'Hines properties face intense summer heat and deep winter freezes. Our engineering-grade approach ensures long-term asset survival.',
    protectionFeatures: ['Deep Freeze Protection', 'Wildfire Hardening', 'Scientific Moisture Audits', 'Local Service Priority'],
    localCommunities: ['Hines', 'Burns', 'Riley', 'Crane'],
    coordinates: { lat: 43.5613, lng: -119.0835 },
    caseStudy: {
      title: 'Commercial Building Winterization',
      description: 'A complete winterization of a commercial building in Hines, including a new heating system and insulation.',
      imageUrl: '/images/case-studies/hines-commercial.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions helped us save a lot of money on our heating bills. They are the best in the business.',
      author: 'Tom Williams',
      authorTitle: 'Business Owner'
    }
  },
  riley: {
    slug: 'riley',
    city: 'Riley',
    county: 'Harney',
    region: 'harneyCounty',
    title: 'Riley Oregon Remote Asset Protection | Benson Home Solutions',
    description: 'Expert property maintenance for remote Harney County assets in Riley, Oregon. Specialized deep-freeze protection and wildfire hardening.',
    heroTitle: 'Riley\'s Remote',
    heroSubtitle: 'Property Sentinels.',
    heroDescription: 'Ensuring the integrity of remote Harney County properties through specialized high-desert maintenance.',
    protectionTitle: 'Remote Asset Integrity',
    protectionDescription: 'In Riley, distance and weather are the primary risks. We specialize in autonomous property health and extreme weather resilience.',
    protectionFeatures: ['Remote Site Monitoring', 'Wildfire Buffer Creation', 'Deep Winter Survival', 'Structural Analysis'],
    localCommunities: ['Riley', 'Hines', 'Burns', 'Hampton'],
    coordinates: { lat: 43.5388, lng: -119.5049 },
    caseStudy: {
      title: 'Off-Grid Cabin Maintenance',
      description: 'A complete maintenance of an off-grid cabin in Riley, including solar panel cleaning, and water system inspection.',
      imageUrl: '/images/case-studies/riley-cabin.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions is the only company we trust to take care of our remote cabin.',
      author: 'Sue Green',
      authorTitle: 'Cabin Owner'
    }
  },
  drewsey: {
    slug: 'drewsey',
    city: 'Drewsey',
    county: 'Harney',
    region: 'harneyCounty',
    title: 'Drewsey Oregon Deep Freeze Protection | Benson Home Solutions',
    description: 'Specialized property care for Drewsey, Oregon. Expert winterization and maintenance for Harney County\'s most extreme conditions.',
    heroTitle: 'Drewsey\'s Deep',
    heroSubtitle: 'Freeze Experts.',
    heroDescription: 'Surviving the Harney County winter requires more than just luck. It requires technical precision and specialized engineering.',
    protectionTitle: 'Deep Freeze Resilience',
    protectionDescription: 'Drewsey properties face some of Oregon\'s coldest temperatures. Our winterization programs are the gold standard for high-desert property survival.',
    protectionFeatures: ['Extreme Cold Winterization', 'Thermal Envelope Audits', 'Frozen Pipe Mitigation', 'Wildfire Resilience'],
    localCommunities: ['Drewsey', 'Juntura', 'Burns', 'Crane'],
    coordinates: { lat: 43.7915, lng: -118.3855 },
    caseStudy: {
      title: 'Historic Hotel Winterization',
      description: 'A complete winterization of a historic hotel in Drewsey, including a new boiler and insulation.',
      imageUrl: '/images/case-studies/drewsey-hotel.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions helped us preserve a piece of history. We are so grateful for their expertise.',
      author: 'David Clark',
      authorTitle: 'Hotel Owner'
    }
  },
  corvallis: {
    slug: 'corvallis',
    city: 'Corvallis',
    county: 'Benton',
    region: 'midWillametteValley',
    title: 'Corvallis Oregon Property Maintenance | Benson Home Solutions',
    description: 'Expert home maintenance and restoration in Corvallis, Oregon. Licensed contractor serving Benton County and OSU community.',
    heroTitle: 'Corvallis\'s Trusted',
    heroSubtitle: 'Guardians.',
    heroDescription: 'Providing scientific property care for Corvallis residential and commercial assets.',
    protectionTitle: 'Benton County Shield',
    protectionDescription: 'Corvallis properties require specialized maintenance to handle the unique Valley moisture and structural challenges.',
    protectionFeatures: ['Moisture Control Systems', 'Structural Integrity Audits', 'Emergency Water Extraction', 'Preventative Maintenance'],
    localCommunities: ['Corvallis', 'Philomath', 'Adair Village', 'Monmouth', 'Independence'],
    coordinates: { lat: 44.5646, lng: -123.2620 },
    caseStudy: {
      title: 'OSU Research Facility Maintenance',
      description: 'A complete maintenance of a research facility at Oregon State University, including HVAC and electrical systems.',
      imageUrl: '/images/case-studies/corvallis-osu.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions is a valuable partner in maintaining our research facilities. They are professional, reliable, and always go the extra mile.',
      author: 'Dr. Emily Carter',
      authorTitle: 'Director of Research, OSU'
    }
  },
  keizer: {
    slug: 'keizer',
    city: 'Keizer',
    county: 'Marion',
    region: 'midWillametteValley',
    title: 'Keizer Oregon Home Maintenance | Benson Home Solutions',
    description: 'Professional property care and restoration in Keizer, Oregon. Licensed contractor serving the greater Salem-Keizer area.',
    heroTitle: 'Keizer\'s Precision',
    heroSubtitle: 'Contractors.',
    heroDescription: 'High-standard maintenance and emergency response for Keizer residential properties.',
    protectionTitle: 'Keizer Community Care',
    protectionDescription: 'Maintaining the value of Keizer homes through proactive audits and rapid emergency response.',
    protectionFeatures: ['Local Rapid Response', 'Roof & Gutter Systems', 'Siding Integrity Audits', 'Subscription Maintenance'],
    localCommunities: ['Keizer', 'Salem', 'Brooks', 'Hayesville', 'Gervais'],
    coordinates: { lat: 44.9979, lng: -123.0220 },
    caseStudy: {
      title: 'Retail Storefront Maintenance',
      description: 'A complete maintenance of a retail storefront in Keizer, including window cleaning, and parking lot maintenance.',
      imageUrl: '/images/case-studies/keizer-retail.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions keeps our storefront looking great. They are a pleasure to work with.',
      author: 'Laura Davis',
      authorTitle: 'Store Manager'
    }
  },
  salem: {
    slug: 'salem',
    city: 'Salem',
    county: 'Marion',
    region: 'midWillametteValley',
    title: 'Salem Oregon Home Maintenance | Benson Home Solutions',
    description: 'Expert home maintenance and emergency restoration in Salem, Oregon. Licensed contractor (CCB #258533) serving the Mid-Willamette Valley.',
    heroTitle: 'Salem\'s Premier',
    heroSubtitle: 'Property Experts.',
    heroDescription: 'Serving the State Capitol and surrounding areas with building science and precision maintenance.',
    protectionTitle: 'Mid-Valley Integrity',
    protectionDescription: 'Salem properties face diverse moisture and structural risks. Our methodology ensures long-term asset protection.',
    protectionFeatures: ['Capitol Region Emergency Response', 'Advanced Audit Technology', 'Monthly Protection Plans', 'Commercial Maintenance'],
    localCommunities: ['Salem', 'Keizer', 'Four Corners', 'West Salem', 'Silverton', 'Dallas'],
    coordinates: { lat: 44.9429, lng: -123.0351 },
    caseStudy: {
      title: 'State Government Building Maintenance',
      description: 'A complete maintenance of a state government building in Salem, including HVAC, and plumbing systems.',
      imageUrl: '/images/case-studies/salem-government.jpg'
    },
    testimonial: {
      quote: 'Benson Home Solutions is a reliable and trustworthy partner. They keep our building running smoothly.',
      author: 'Mark Johnson',
      authorTitle: 'Facilities Manager'
    }
  }
};
