import { SERVICE_AREAS } from './constants';

export type Region = 'Mid-Willamette Valley' | 'Harney County';

export interface AreaData {
  slug: string;
  name: string;
  region: Region;
  county: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  mainHeading: string;
  mainText1: string;
  mainText2: string;
  benefits: string[];
  localCitiesHeading: string;
  localCitiesText: string;
  localCities: string[];
  coordinates: { lat: number; lng: number };
}

export const AREA_DATA: Record<string, AreaData> = {
  albany: {
    slug: 'albany',
    name: 'Albany',
    region: 'Mid-Willamette Valley',
    county: 'Linn',
    badge: 'Serving Albany & Linn County',
    heroTitle: "Albany's Diagnostic",
    heroSubtitle: 'Property Experts.',
    mainHeading: 'Linn County Protection',
    mainText1: 'Albany properties face unique moisture challenges. Our comprehensive audits and maintenance plans are engineered to stop rot before it starts. The frequent rainfall and persistent humidity in the Willamette Valley require specialized building-science approaches that average contractors overlook. We use advanced thermal imaging and moisture mapping to identify seal failures in your building envelope before they become high-cost structural repairs.',
    mainText2: "Rather than acting as reactive general contractors or simple exterior cleaners, Benson Home Solutions provides intelligent, subscription-based property stewardship. From historic residential properties near downtown Albany to sprawling commercial facilities in Millersburg and Lebanon, our preventative maintenance catches seal failures, ventilation issues, and structural threats before they become high-cost emergencies. We lock in your property's health with guaranteed 24/7 priority response times and comprehensive detailed logging. Our team ensures that your Linn County asset remains resilient against Oregon's unpredictable weather patterns, preserving both its structural integrity and its market value for years to come. By addressing the unique architectural requirements of historic homes and modern commercial developments alike, our team ensures that your property not only survives but thrives. We meticulously document every inspection, providing board-ready reporting and comprehensive lifecycle mapping that removes the guesswork from property management. Investing in our preventative maintenance subscriptions is the single most effective way to eliminate surprise capital expenditures and preserve long-term asset value in Linn County.",
    benefits: ['Rapid Emergency Response', 'Monthly Protection Plans', 'Board-Ready Documentation', 'Comprehensive Audit Technology'],
    localCitiesHeading: 'Local Service Area',
    localCitiesText: 'We serve the Albany area and surrounding Linn County communities, providing local expertise for local property challenges:',
    localCities: ['Albany', 'Millersburg', 'Tangest', 'Jefferson', 'Lebanon', 'Sweet Home'],
    coordinates: { lat: 44.6365, lng: -123.1059 },
  },
  corvallis: {
    slug: 'corvallis',
    name: 'Corvallis',
    region: 'Mid-Willamette Valley',
    county: 'Benton',
    badge: 'Serving Corvallis & Benton County',
    heroTitle: "Corvallis's Diagnostic",
    heroSubtitle: 'Property Experts.',
    mainHeading: 'Benton County Protection',
    mainText1: 'Corvallis properties face unique moisture challenges. Our comprehensive audits and maintenance plans are engineered to stop rot before it starts. The frequent rainfall and persistent humidity in the Willamette Valley require specialized building-science approaches that average contractors overlook. We focus on the high standards required by the university community and local research facilities.',
    mainText2: "Rather than acting as reactive general contractors or simple exterior cleaners, Benson Home Solutions provides intelligent, subscription-based property stewardship. From historic residential properties near downtown Corvallis to sprawling commercial facilities in Philomath and Adair Village, our preventative maintenance catches seal failures, ventilation issues, and structural threats before they become high-cost emergencies. We lock in your property's health with guaranteed 24/7 priority response times and comprehensive detailed logging. By implementing a proactive stewardship model, Corvallis property owners can avoid the cycle of neglect and emergency repair that plagues so many Pacific Northwest assets. As a university hub, Corvallis sees high tenant turnover and demanding property requirements. Our advanced diagnostic tools, including thermal imaging and detailed moisture mapping, allow us to pinpoint hidden issues long before they require massive structural overhauls. We specialize in maintaining tight building envelopes that keep energy costs low and indoor air quality high, ensuring that your property remains a competitive, high-value asset in the local market.",
    benefits: ['Rapid Emergency Response', 'Monthly Protection Plans', 'Board-Ready Documentation', 'Comprehensive Audit Technology'],
    localCitiesHeading: 'Local Service Area',
    localCitiesText: 'We serve the Corvallis area and surrounding Benton County communities with dedicated maintenance professional services:',
    localCities: ['Corvallis', 'Philomath', 'Adair Village', 'Monmouth', 'Independence'],
    coordinates: { lat: 44.5646, lng: -123.2620 },
  },
  salem: {
    slug: 'salem',
    name: 'Salem',
    region: 'Mid-Willamette Valley',
    county: 'Marion',
    badge: 'Serving Salem & Keizer',
    heroTitle: "Salem's Diagnostic",
    heroSubtitle: 'Property Experts.',
    mainHeading: 'Valley-Specific Protection',
    mainText1: "Salem's high humidity and persistent rainfall require a specialized approach to property care. Our comprehensive audits identify moisture intrusion in building envelopes before structural rot begins. We understand the capital city's unique architectural landscape, from mid-century modern homes to state-level commercial facilities.",
    mainText2: "As the capital city, Salem's properties range from high-density commercial blocks to sprawling residential estates. Our maintenance subscriptions are designed to scale, providing the same high-level diagnostic oversight whether we're managing a single home or a multi-unit complex. With 24/7 priority response, we ensure that Salem's property owners are never left stranded during Oregon's unpredictable storm seasons. Our detailed detailed logging provides a clear paper trail for insurance and compliance needs, ensuring your asset is not just maintained, but documented to the highest standards of professional stewardship.",
    benefits: ['24/7 Emergency Response', 'Monthly Protection Subscriptions', 'Diagnostic Moisture Audits', 'Commercial Board Reporting'],
    localCitiesHeading: 'Service Area Details',
    localCitiesText: 'We serve the entire Salem metropolitan area, including Keizer and surrounding Marion County districts:',
    localCities: ['North Salem', 'South Salem', 'West Salem', 'Keizer', 'Hayesville', 'Four Corners'],
    coordinates: { lat: 44.9429, lng: -123.0351 },
  },
  burns: {
    slug: 'burns',
    name: 'Burns',
    region: 'Harney County',
    county: 'Harney',
    badge: 'Serving Harney County',
    heroTitle: 'High Desert',
    heroSubtitle: 'Asset Protection.',
    mainHeading: 'Extreme Climate Strategy',
    mainText1: 'Harney County properties face extreme temperature swings and wildfire risk. Our diagnostic approach focuses on thermal efficiency, winterization, and wildfire hardening. In a region where a winter freeze can be catastrophic, we provide the technical expertise needed to keep your systems running regardless of the temperature.',
    mainText2: "Unlike traditional ad-hoc general contractors and handymen who only show up when something is already broken, Benson Home Solutions provides structured, preventative maintenance subscriptions. In a region where finding available tradespeople during an emergency is incredibly difficult, our proactive approach ensures your HVAC, roofing, and weather sealing are audited and maintained year-round. Don't wait for a frozen pipe in Hines or a failing roof in Drewsey—our dedicated subscription plans lock in your priority service and prevent catastrophic failures before they start. We specialize in the high-desert building science that preserves remote assets against the harsh elements of Eastern Oregon. The harsh high-desert climate demands specialized building science expertise. From extreme temperature fluctuations that stress HVAC systems to intense UV exposure that degrades roofing materials, our localized approach ensures your property is fortified against the elements. Our comprehensive seasonal audits and 24/7 emergency response protocols mean that even in the most severe winter freezes or summer heatwaves, your property remains secure, functional, and fully protected.",
    benefits: ['Wildfire Hardening Audits', 'Deep Freeze Winterization', 'Commercial Asset Management', 'Ecclesiastical Preservation'],
    localCitiesHeading: 'Harney Service Area',
    localCitiesText: 'We provide specialized high-desert services throughout the massive reach of Harney County:',
    localCities: ['Burns', 'Hines', 'Riley', 'Drewsey', 'Crane', 'Lawen', 'Princeton'],
    coordinates: { lat: 43.5863, lng: -119.0543 },
  },
  hines: {
    slug: 'hines',
    name: 'Hines',
    region: 'Harney County',
    county: 'Harney',
    badge: 'Serving Harney County',
    heroTitle: 'Hines Property',
    heroSubtitle: 'Preservation.',
    mainHeading: 'High Desert Winterization',
    mainText1: 'Hines properties require specialized attention to withstand the harsh high-desert winters. Our comprehensive audits prioritize thermal envelope integrity and pipe protection. We ensure that your home or commercial building is properly sealed against the extreme temperature differentials common in the region.',
    mainText2: "Being adjacent to Burns, Hines shares many of the same climate risks, but with its unique residential character, it requires a tailored maintenance approach. We help Hines homeowners protect their investments from the silent threats of ice dams, crawlspace moisture, and extreme UV exposure. Our subscription model ensures your home is ready for every season, with professional documentation that preserves your property's value. We act as your on-call property stewards, providing regular checks that identify system aging long before it leads to a midnight emergency. In Hines, professional maintenance isn't just a convenience; it's a necessity for property longevity. Hines homeowners and facility managers rely on our diagnostic approach to avoid the compounding costs of deferred maintenance. Ice dams, frozen pipes, and compromised thermal envelopes can cause devastating damage if left unchecked. By prioritizing predictive maintenance over reactive repairs, we provide unparalleled peace of mind. Our customized subscription plans ensure that every critical system in your building is optimized for the high-desert environment, saving you thousands in avoidable emergency interventions.",
    benefits: ['Deep Freeze Protection', 'UV-Resistant Sealing', 'Emergency Priority Response', 'Year-Round Proactive Monitoring'],
    localCitiesHeading: 'Local Service Reach',
    localCitiesText: 'We serve Hines and the surrounding high-desert communities with reliable property care:',
    localCities: ['Hines', 'Burns', 'Riley', 'Crane'],
    coordinates: { lat: 43.5785, lng: -119.0833 },
  },
  drewsey: {
    slug: 'drewsey',
    name: 'Drewsey',
    region: 'Harney County',
    county: 'Harney',
    badge: 'Serving Rural Harney County',
    heroTitle: 'Drewsey & Remote',
    heroSubtitle: 'Property Care.',
    mainHeading: 'Ranch & Remote Preservation',
    mainText1: 'For remote properties in Drewsey and eastern Harney County, reliability is everything. We provide the professional maintenance infrastructure that remote assets demand. Our expertise in off-grid and remote property systems ensures your asset remains functional and protected even when miles from the nearest town.',
    mainText2: "Remote properties face the highest risks from delayed response times. Our maintenance program is specifically designed for ranch owners and remote asset managers who can't afford to wait for a crisis. We provide comprehensive, scheduled comprehensive audits that identify issues months before they become emergencies. From structural stability in high winds to extreme cold-weather winterization, we bring professional-grade property stewardship to the most remote corners of Harney County. We handle the logistical challenges of remote servicing so you can focus on your operations, knowing your building assets are under expert watch. Managing a remote property requires a proactive, logistics-first approach. We understand the challenges of sourcing reliable contractors in eastern Harney County, which is why our subscription plans guarantee priority service and scheduled, rigorous inspections. By anticipating system failures and performing critical preventative maintenance, we protect your ranch, commercial facility, or residential estate from the devastating impact of severe weather events and long-term environmental wear.",
    benefits: ['Remote Asset Management', 'Severe Weather Hardening', 'Independent System Audits', 'Logistical Priority Access'],
    localCitiesHeading: 'Eastern Harney Coverage',
    localCitiesText: 'Serving Drewsey and the remote ranchlands of eastern Oregon with professional integrity:',
    localCities: ['Drewsey', 'Crane', 'Juntura', 'Princeton'],
    coordinates: { lat: 43.7999, lng: -118.3844 },
  },
  lebanon: {
    slug: 'lebanon',
    name: 'Lebanon',
    region: 'Mid-Willamette Valley',
    county: 'Linn',
    badge: 'Serving Lebanon & Linn County',
    heroTitle: 'Lebanon Property',
    heroSubtitle: 'Stewardship.',
    mainHeading: 'Linn County Resilience',
    mainText1: 'Lebanon properties require proactive moisture management to prevent the structural rot common in the Mid-Valley. Our diagnostic approach stops damage before it starts. We focus on the industrial and residential mix that defines Lebanon, ensuring that building envelopes are properly maintained against the Valley\'s persistent rain.',
    mainText2: "From the industrial facilities supporting Lebanon's growth to the residential neighborhoods across the city, we provide a new standard of property maintenance. Our subscription plans offer the peace of mind that comes with knowing your property is being monitored by experts using the latest diagnostic technology. We ensure your building envelope is tight, your drainage is clear, and your assets are protected year-round. Our goal is to eliminate the 'emergency repair cycle' for Lebanon owners, replacing it with a data-driven stewardship model that preserves property value and reduces long-term costs. Whether you manage a large campus or a single home, we are your partners in property health.",
    benefits: ['Industrial Maintenance', 'Residential Protection', 'Moisture Intrusion Audits', '24/7 Priority Response'],
    localCitiesHeading: 'Linn County Reach',
    localCitiesText: 'We serve Lebanon and nearby communities with specialized building science solutions:',
    localCities: ['Lebanon', 'Sweet Home', 'Waterloo', 'Sodaville', 'Albany'],
    coordinates: { lat: 44.5365, lng: -122.9070 },
  },
  keizer: {
    slug: 'keizer',
    name: 'Keizer',
    region: 'Mid-Willamette Valley',
    county: 'Marion',
    badge: 'Serving Keizer & Salem',
    heroTitle: 'Keizer Property',
    heroSubtitle: 'Maintenance.',
    mainHeading: 'Iris Capital Protection',
    mainText1: 'Keizer properties face the same persistent moisture and humidity as the rest of the Valley. Our comprehensive audits are the first line of defense against structural decay. We specialize in maintaining the tight building envelopes required for Keizer\'s residential developments and commercial corridors.',
    mainText2: "Whether you're in a classic Keizer residential neighborhood or managing a commercial property along River Road, our maintenance subscriptions provide superior protection. We don't just fix things when they break; we prevent them from breaking in the first place. With our detailed logging and priority response, Keizer property owners can rest easy knowing their investment is secure. Our preventative approach identified potential mold and rot issues months before they become visible, saving our clients thousands in avoidable remediation costs. Let us bring our building science expertise to your Keizer property and shift your maintenance from reactive to proactive.",
    benefits: ['Building Science Audits', 'Emergency Rapid Response', 'Subscription Maintenance', 'Detailed Asset Logging'],
    localCitiesHeading: 'Keizer Service Area',
    localCitiesText: 'Serving Keizer and the greater North Salem area with professional property stewardship:',
    localCities: ['Keizer', 'North Salem', 'Hayesville', 'Clear Lake', 'Brooks'],
    coordinates: { lat: 44.9901, lng: -123.0262 },
  }
};

export const DEFAULT_AREA: AreaData = {
  slug: 'default',
  name: 'Oregon',
  region: 'Mid-Willamette Valley',
  county: 'Linn/Benton/Marion/Harney',
  badge: 'Serving the Mid-Valley & Harney County',
  heroTitle: 'Oregon Property',
  heroSubtitle: 'Diagnostic Experts.',
  mainHeading: 'Professional Stewardship',
  mainText1: "Benson Home Solutions provides high-level property maintenance across multiple Oregon climate zones. From the humid Willamette Valley to the arid High Desert, we protect your assets.",
  mainText2: "Our mission is to shift property owners from a reactive 'repair' mindset to a proactive 'stewardship' mindset. Using diagnostic technology and building science, we identify and mitigate risks before they become financial burdens. Our subscription plans ensure your property is always audited, always maintained, and always ready for whatever Oregon's climate throws at it.",
  benefits: ['Diagnostic Site Audits', 'Maintenance Subscriptions', '24/7 Priority Response', 'Professional Documentation'],
  localCitiesHeading: 'Service Areas',
  localCitiesText: 'We serve a wide range of communities across Oregon:',
  localCities: [...SERVICE_AREAS.midWillametteValley, ...SERVICE_AREAS.harneyCounty],
  coordinates: { lat: 44.9429, lng: -123.0351 }, // Default to Salem area
};

export function getAreaData(slug: string): AreaData {
  return AREA_DATA[slug] || { ...DEFAULT_AREA, name: slug.charAt(0).toUpperCase() + slug.slice(1), slug };
}
