export type ServicePage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  problems: string[];
  scope: string[];
  process: string[];
  rural: string;
  insurance?: string;
  faq: { question: string; answer: string }[];
  related: string[];
};

const commonProcess = [
  'Review the property location, photos, access, timing, and immediate risks.',
  'Define a written scope, identify trade or permit dependencies, and plan materials and mobilization.',
  'Perform the approved work with progress documentation and a clear closeout.',
];

export const services: ServicePage[] = [
  {
    slug: 'post-fire-cleanup-recovery', title: 'Post-Fire Cleanup & Recovery', eyebrow: 'Wildfire Recovery',
    description: 'Post-fire construction recovery for Harney County properties: documentation, stabilization, demolition coordination, repair, and reconstruction.',
    intro: 'After a wildfire, the first construction decision should be what is safe to disturb and what must be handled by a regulated specialist. Benson Home Solutions helps owners organize the construction side of recovery from initial documentation through repair and reconstruction.',
    problems: ['Fire-damaged homes, shops, outbuildings, and rural properties', 'Unsafe or weather-exposed openings after a fire', 'Damaged finishes, framing, windows, doors, insulation, and flooring', 'Owners who need a practical recovery scope before rebuilding'],
    scope: ['Photo and condition documentation', 'Temporary weather protection and board-up where appropriate', 'Selective or structural demolition after hazardous-material requirements are resolved', 'Non-regulated construction debris and site cleanup where disposal rules allow', 'Framing, window, door, insulation, drywall, painting, flooring, and finish reconstruction', 'Licensed electrical, plumbing, HVAC, engineering, and specialty-trade coordination when required', 'Repair and reconstruction estimating and project management'],
    process: ['Document conditions and identify immediate stabilization needs.', 'Confirm asbestos, ash, hazardous-waste, utility, permit, and disposal requirements before disturbance.', 'Separate regulated specialty work from the ordinary construction scope.', 'Complete approved demolition, repair, and reconstruction in a documented sequence.'],
    rural: 'Fire recovery in Harney County can involve long material runs, limited disposal options, utility outages, damaged access, and scarce specialty trades. Mobilization and trade sequencing are planned around those realities.',
    insurance: 'Contact the insurer before cleanup or demolition. We can document construction conditions and prepare repair scopes, but coverage decisions remain with the carrier. Fire ash and debris may contain asbestos, lead, chemicals, batteries, fuels, and other regulated materials; Benson does not market ordinary construction cleanup as licensed hazardous-material abatement.',
    faq: [
      { question: 'Can you remove all wildfire ash and debris?', answer: 'Not automatically. Burned-building ash and debris can contain regulated hazardous materials. The required survey, abatement, transport, and disposal path must be established first. We can coordinate the construction recovery scope with appropriately licensed specialists when required.' },
      { question: 'Can you rebuild after demolition?', answer: 'Yes, within our licensed construction scope. Reconstruction can include framing, windows and doors, insulation, drywall, painting, flooring, finishes, and coordination of licensed trade subcontractors.' },
    ], related: ['fire-damage-demolition', 'fire-damage-repair-reconstruction', 'post-fire-property-cleanup']
  },
  {
    slug: 'fire-damage-demolition', title: 'Fire Damage Demolition', eyebrow: 'Wildfire Recovery',
    description: 'Selective and structural fire-damage demolition with documentation, site planning, and reconstruction in mind.',
    intro: 'Fire demolition is not ordinary tear-out. The structure may be unstable, utilities may be compromised, and ash or building materials may require regulated handling. We plan demolition only after those conditions are addressed.',
    problems: ['Burned or structurally damaged building sections', 'Interior materials that must be removed before reconstruction', 'Openings and assemblies damaged beyond practical repair', 'Partial losses where undamaged portions need protection'],
    scope: ['Selective interior demolition', 'Exterior and structural demolition within approved scope', 'Removal of fire-damaged framing and finishes after clearance', 'Protection of retained building sections', 'Photo documentation and debris staging', 'Site clearing and preparation for reconstruction'],
    process: commonProcess,
    rural: 'Remote demolition requires disposal planning before equipment or crews mobilize. We confirm access, haul routes, disposal acceptance, utilities, and specialty requirements first.',
    insurance: 'Insurance-loss demolition should be documented before material is removed. Hazardous-material and asbestos requirements are handled separately through qualified parties where applicable.',
    faq: [{ question: 'Do you perform asbestos abatement?', answer: 'We do not advertise regulated asbestos abatement. When asbestos or other regulated material is present, the work must follow Oregon requirements and may require a DEQ-licensed abatement contractor.' }],
    related: ['post-fire-cleanup-recovery', 'fire-damage-repair-reconstruction', 'demolition']
  },
  {
    slug: 'fire-damage-repair-reconstruction', title: 'Fire Damage Repair & Reconstruction', eyebrow: 'Wildfire Recovery',
    description: 'Repair and reconstruction of fire-damaged homes and light-commercial buildings after the property is cleared for construction.',
    intro: 'Once the damaged property is safe for normal construction, the job becomes a sequencing problem: structural repairs first, then weather protection, rough trades, insulation, drywall, finishes, and closeout.',
    problems: ['Damaged framing and exterior openings', 'Rooms stripped for fire or smoke damage', 'Window, door, insulation, drywall, and flooring replacement', 'Projects requiring multiple licensed trades'],
    scope: ['Framing and structural repair', 'Engineered beam or structural-detail coordination where required', 'Window and exterior door replacement', 'Insulation, drywall, texture, painting, flooring, trim, and finish work', 'Electrical, plumbing, and HVAC subcontractor coordination', 'Construction documentation and project management'],
    process: commonProcess,
    rural: 'We plan long-lead materials and subcontractor trips together to reduce avoidable travel and downtime on remote reconstruction work.',
    insurance: 'We can build from an approved repair scope and document construction progress. Changes caused by concealed damage should be documented before proceeding when the project is insurance-funded.',
    faq: [{ question: 'Can you manage the full reconstruction?', answer: 'We can manage the general construction scope and coordinate licensed specialty trades. Engineering and regulated specialty work are provided by appropriately qualified outside professionals when required.' }],
    related: ['post-fire-cleanup-recovery', 'framing-structural-repairs', 'window-door-replacement']
  },
  {
    slug: 'post-fire-property-cleanup', title: 'Post-Fire Property Cleanup', eyebrow: 'Wildfire Recovery',
    description: 'Construction-side post-fire property cleanup and site preparation after regulated debris requirements are established.',
    intro: 'Cleanup starts with classification, not a loader. We determine what can be handled as ordinary construction material and what must stay under a regulated debris or hazardous-material process.',
    problems: ['Exterior construction debris after a fire', 'Vegetation and non-regulated material blocking access', 'Sites that need organization before repair crews arrive', 'Partial losses requiring protection of retained areas'],
    scope: ['Condition documentation', 'Non-regulated debris cleanup where permitted', 'Exterior cleanup and access preparation', 'Material staging and site organization', 'Coordination with specialty debris contractors', 'Preparation for demolition or reconstruction'],
    process: commonProcess,
    rural: 'Harney County disposal and haul distances can control the entire cleanup plan, so disposal acceptance and route logistics are confirmed before loading.',
    insurance: 'Burned structural ash is not assumed to be ordinary debris. We follow the required survey, waste classification, and licensed-specialist boundaries before construction cleanup begins.',
    faq: [{ question: 'Why can’t all burned debris go in a normal construction load?', answer: 'Because wildfire debris can contain asbestos and other hazardous materials, and disposal facilities may require specific testing, packaging, documentation, or licensed handling.' }],
    related: ['post-fire-cleanup-recovery', 'fire-damage-demolition', 'exterior-property-cleanup']
  },
  {
    slug: 'demolition', title: 'Demolition', eyebrow: 'Construction Services',
    description: 'Interior, exterior, selective, and structure demolition for remodel preparation, damage repair, and property recovery.',
    intro: 'Good demolition removes what needs to go without creating unnecessary repair work. We scope access, utilities, retained finishes, debris handling, and the next construction phase before tear-out starts.',
    problems: ['Interior tear-out before reconstruction', 'Damaged materials after water or fire losses', 'Exterior assemblies beyond repair', 'Small structures or sections requiring removal'],
    scope: ['Interior and exterior demolition', 'Selective demolition', 'Structure demolition where appropriate', 'Remodel and reconstruction preparation', 'Debris staging, loading, and ordinary construction-waste handling'],
    process: commonProcess, rural: 'Remote demolition is priced and scheduled around haul distance, disposal availability, equipment access, and the next phase of work.',
    faq: [{ question: 'Do you handle hazardous materials?', answer: 'Regulated hazardous-material work is excluded unless it falls within our verified legal scope. We coordinate qualified specialists when testing or licensed abatement is required.' }],
    related: ['fire-damage-demolition', 'water-damage-restoration', 'trash-outs-property-cleanouts']
  },
  {
    slug: 'water-damage-restoration', title: 'Water Damage Restoration', eyebrow: 'Damage & Reconstruction',
    description: 'Water-loss documentation, damaged-material removal, mitigation support, moisture-source correction, and reconstruction.',
    intro: 'Water work is only successful when the source is controlled and wet assemblies are addressed before they are covered back up. We document the affected area, remove damaged materials within scope, coordinate drying needs, and rebuild.',
    problems: ['Plumbing leaks and supply-line failures', 'Wet drywall, flooring, insulation, and subfloor', 'Exterior water intrusion', 'Post-mitigation reconstruction'],
    scope: ['Condition and photo documentation', 'Damaged-material removal', 'Drying and mitigation support', 'Moisture-source repair within construction scope', 'Subfloor, drywall, paint, flooring, trim, window, and door reconstruction', 'Specialist coordination when required'],
    process: commonProcess, rural: 'Remote water losses need early decisions because drying equipment, plumbers, and replacement materials may be hours away.',
    insurance: 'For insured losses, document conditions before demolition when safe to do so and coordinate scope changes with the carrier or adjuster.',
    faq: [{ question: 'Do you rebuild after dry-out?', answer: 'Yes. Reconstruction can include subfloor, insulation, drywall, texture, paint, flooring, trim, and other damaged building components.' }],
    related: ['mold-mitigation', 'flooring', 'drywall']
  },
  {
    slug: 'mold-mitigation', title: 'Mold Mitigation & Reconstruction', eyebrow: 'Moisture & Repair',
    description: 'Moisture-source correction, damaged-material removal within applicable scope, reconstruction, and specialist coordination for mold-related projects.',
    intro: 'Mold is usually evidence of a moisture problem. The durable fix is to identify and correct the water source, determine whether specialist assessment or containment is required, and then rebuild affected assemblies correctly.',
    problems: ['Mold associated with roof, plumbing, window, or crawlspace moisture', 'Damaged drywall, insulation, flooring, or subfloor', 'Recurring moisture that has not been corrected'],
    scope: ['Moisture-source repair within construction scope', 'Selective damaged-material removal where legally appropriate', 'Reconstruction of affected assemblies', 'Coordination with testing or remediation specialists when required'],
    process: commonProcess, rural: 'We plan specialist visits and reconstruction work together so remote projects do not stall between assessment, correction, and rebuild.',
    faq: [{ question: 'Do you perform every type of mold remediation?', answer: 'No. Scope depends on the condition, applicable requirements, and project risk. Where specialized assessment or remediation is appropriate, we coordinate with qualified providers and handle the construction repairs.' }],
    related: ['water-damage-restoration', 'drywall', 'flooring']
  },
  {
    slug: 'window-door-replacement', title: 'Window & Door Replacement', eyebrow: 'Exterior Envelope',
    description: 'Residential and light-commercial window and door replacement for failed units, damaged openings, weatherization, and security.',
    intro: 'A replacement opening has to work as part of the wall, not just fit the hole. We pay attention to measurements, flashing, trim, air and water control, operation, and the condition of the surrounding opening.',
    problems: ['Failed or drafty windows', 'Damaged exterior doors and frames', 'Rot or deterioration around openings', 'Security and weather-sealing problems'],
    scope: ['Replacement windows', 'Exterior and entry doors', 'Opening repair and trim', 'Flashing and weather sealing', 'Lock and hardware improvements', 'Light-commercial replacement openings'],
    process: commonProcess, rural: 'Accurate field measurements and ordering matter more when a replacement unit is hours from the supplier. We verify openings and access before ordering.',
    faq: [{ question: 'Can you repair damage around the opening?', answer: 'Yes. The scope can include localized framing, trim, flashing, siding interface, and interior finish repairs discovered around a failed window or door.' }],
    related: ['weatherization-air-sealing', 'lock-changes-property-security', 'framing-structural-repairs']
  },
  {
    slug: 'drywall', title: 'Drywall Installation & Repair', eyebrow: 'Interior Reconstruction',
    description: 'Drywall hanging, taping, finishing, texture, repair, and reconstruction for occupied properties and damage-loss projects.',
    intro: 'Drywall work is often the point where rough repairs become a finished room again. We handle patches through larger reconstruction scopes and match the finish plan to the surrounding space.',
    problems: ['Water or fire-related drywall removal', 'Open walls after plumbing or electrical work', 'Damaged ceilings and walls', 'Full-room reconstruction'],
    scope: ['Hanging and replacement', 'Taping and finishing', 'Texture including heavy knockdown where specified', 'Patches and repair', 'Reconstruction after mitigation or demolition'],
    process: commonProcess, rural: 'We coordinate board, finishing materials, drying time, texture, paint, and return trips to avoid inefficient remote mobilization.',
    faq: [{ question: 'Can drywall be part of a larger reconstruction scope?', answer: 'Yes. It is commonly sequenced with insulation, rough-trade completion, texture, painting, flooring, and trim.' }], related: ['painting', 'water-damage-restoration', 'fire-damage-repair-reconstruction']
  },
  {
    slug: 'painting', title: 'Interior & Exterior Painting', eyebrow: 'Finish Work',
    description: 'Interior and exterior painting for repairs, reconstruction, maintenance, and property turnover.',
    intro: 'Paint performs best when the substrate is ready. We include the repair and preparation steps needed for the approved scope instead of treating coating as a shortcut over failed material.',
    problems: ['Repaired walls and ceilings needing finish paint', 'Weathered exterior surfaces', 'Turnover and reconstruction finish work'],
    scope: ['Interior painting', 'Exterior painting', 'Reconstruction painting', 'Surface preparation and localized repairs', 'Trim and finish coating'],
    process: commonProcess, rural: 'Exterior work is scheduled around high-desert wind, temperature, cure windows, access, and material availability.',
    faq: [{ question: 'Do you paint after drywall repairs?', answer: 'Yes. Drywall, texture, primer, and finish paint can be scoped together for a consistent closeout.' }], related: ['drywall', 'exterior-property-cleanup', 'fire-damage-repair-reconstruction']
  },
  {
    slug: 'flooring', title: 'Flooring & Subfloor Repair', eyebrow: 'Interior Reconstruction',
    description: 'LVP installation, damaged flooring removal, subfloor evaluation and replacement, and reconstruction flooring.',
    intro: 'A new floor is only as good as what is under it. We evaluate the exposed substrate, address damaged subfloor within scope, and install the finish floor after the assembly is ready.',
    problems: ['Water-damaged flooring', 'Soft or failed subfloor', 'Worn flooring in repair or turnover projects', 'Reconstruction after mitigation'],
    scope: ['LVP installation', 'Damaged flooring removal', 'Subfloor evaluation and localized replacement', 'Underlayment and transition work', 'Base and trim coordination'],
    process: commonProcess, rural: 'We verify quantities, transitions, substrate conditions, and acclimation requirements before remote installation trips.',
    faq: [{ question: 'Can you replace subfloor discovered under damaged flooring?', answer: 'Yes, when the damage is within the approved scope. Structural joist damage is evaluated separately and may change the repair plan.' }], related: ['water-damage-restoration', 'drywall', 'painting']
  },
  {
    slug: 'framing-structural-repairs', title: 'Framing & Structural Repairs', eyebrow: 'Structural Construction',
    description: 'Damaged framing repair, wall modifications, structural reconstruction, and coordination for engineered LVL or Glulam work.',
    intro: 'Structural work starts with identifying what is actually carrying load. Straightforward framing repairs can be built directly from an approved scope; engineered alterations are coordinated with a qualified design professional when required.',
    problems: ['Fire, water, rot, or impact-damaged framing', 'Openings and walls requiring structural modification', 'Failed framing discovered during demolition'],
    scope: ['Wall and floor framing repair', 'Structural reconstruction', 'Header and beam installation from approved design', 'LVL and Glulam coordination', 'Temporary protection and sequencing with other trades'],
    process: commonProcess, rural: 'Engineered members and specialty hardware can have long lead times. We verify design, lengths, access, lifting, and delivery before mobilization.',
    faq: [{ question: 'Do you provide engineering?', answer: 'Engineering is not represented as an in-house service. When calculations or stamped design are required, we coordinate with a qualified engineer and build from the approved documents.' }], related: ['demolition', 'fire-damage-repair-reconstruction', 'sitework-excavation']
  },
  {
    slug: 'property-maintenance', title: 'Property Maintenance', eyebrow: 'Planned Property Care',
    description: 'Residential, commercial, church, nonprofit, vacant-property, and recurring maintenance throughout Harney County.',
    intro: 'Rural properties often need a contractor who can handle a mixed list in one organized trip. We group practical repair and maintenance scopes, document completed work, and plan follow-up items instead of treating every issue as a separate service call.',
    problems: ['Deferred repairs across one property', 'Commercial or church maintenance lists', 'Vacant-property concerns', 'Recurring seasonal work'],
    scope: ['Residential maintenance', 'Commercial and facility maintenance', 'Church and nonprofit property work', 'Recurring and seasonal maintenance', 'Vacant-property inspections and repairs', 'Mixed repair lists'],
    process: commonProcess, rural: 'Route planning is part of the service. Photos, dimensions, exact location, access, and priority help us combine material runs and remote stops efficiently.',
    faq: [{ question: 'Can you handle several different repairs on one visit?', answer: 'Often, yes. Grouping a documented list is one of the most practical ways to serve rural properties, provided the work fits our licensing and available trades.' }], related: ['weatherization-air-sealing', 'lock-changes-property-security', 'exterior-property-cleanup']
  },
  {
    slug: 'sitework-excavation', title: 'Sitework & Excavation', eyebrow: 'Rural Site Services',
    description: 'Grading, driveway work, utility trenches, site preparation, stump removal, and utility replacement support for rural properties.',
    intro: 'Sitework depends on drainage, soil, access, equipment room, utilities, and what the finished site needs to do. We review those constraints before moving material.',
    problems: ['Poor driveway or work-area drainage', 'Utility trench and replacement needs', 'Sites requiring grading or preparation', 'Stumps or obstructions affecting construction access'],
    scope: ['Grading and site preparation', 'Driveway repair and shaping', 'Utility trenches and replacement support', 'Stump removal', 'Rural construction access preparation'],
    process: commonProcess, rural: 'Haul distance, aggregate availability, equipment transport, underground utilities, weather, and road access are major cost and schedule drivers in Harney County.',
    faq: [{ question: 'Do you coordinate utility trades?', answer: 'Yes. Where plumbing or electrical work requires a licensed trade, we can coordinate the excavation and construction sequence with the appropriate contractor.' }], related: ['concrete-small-projects', 'property-maintenance', 'exterior-property-cleanup']
  },
  {
    slug: 'weatherization-air-sealing', title: 'Weatherization & Air Sealing', eyebrow: 'High-Desert Building Envelope',
    description: 'Air sealing, insulation coordination, window and door improvements, and weather-resistance repairs for Oregon properties.',
    intro: 'High-desert wind, freeze cycles, and temperature swings expose weak points in the building envelope quickly. Weatherization work should address the actual leakage or exposure path, not just add caulk everywhere.',
    problems: ['Drafty openings and penetrations', 'Weather-exposed trim and joints', 'Insulation gaps discovered during repair', 'Doors and windows that no longer seal correctly'],
    scope: ['Air sealing', 'Insulation coordination', 'Window and door weather improvements', 'Localized exterior weather-resistance repairs', 'Envelope corrections associated with reconstruction'],
    process: commonProcess, rural: 'We combine envelope repairs with opening, trim, and material work where practical to reduce repeat travel.',
    faq: [{ question: 'Can weatherization be combined with window or door replacement?', answer: 'Yes. Replacement openings are a good time to correct flashing, air sealing, trim, and related envelope details.' }], related: ['window-door-replacement', 'property-maintenance', 'painting']
  },
  {
    slug: 'trash-outs-property-cleanouts', title: 'Trash-Outs & Property Cleanouts', eyebrow: 'Property Turnover',
    description: 'Abandoned-property cleanup, tenant turnover, property-preservation cleanouts, and ordinary debris removal.',
    intro: 'A cleanout is most useful when it leaves the property ready for the next decision: secure, accessible, documented, and separated from repair work that needs its own scope.',
    problems: ['Tenant turnover debris', 'Abandoned-property contents', 'Foreclosure or preservation cleanup', 'Construction areas blocked by ordinary debris'],
    scope: ['Trash-outs and ordinary debris removal', 'Property cleanouts', 'Turnover cleanup', 'Debris staging and loading', 'Repair-list documentation discovered during cleanout'],
    process: commonProcess, rural: 'Disposal distance, dump acceptance, load size, access, and prohibited materials are confirmed before remote cleanouts.',
    faq: [{ question: 'Are hazardous materials included?', answer: 'No. Chemicals, fuels, asbestos-containing materials, contaminated ash, and other regulated or prohibited waste require the appropriate handling and disposal path.' }], related: ['lock-changes-property-security', 'property-maintenance', 'exterior-property-cleanup']
  },
  {
    slug: 'lock-changes-property-security', title: 'Lock Changes & Property Security', eyebrow: 'Property Preservation',
    description: 'Lock replacement, lockbox installation, vacancy security, and damaged-door or opening repairs.',
    intro: 'Vacant or transitioning property needs controlled access first. We can change locks, install lockboxes, address straightforward door damage, and document other security repairs that need a larger scope.',
    problems: ['Tenant or ownership transitions', 'Vacant properties needing controlled access', 'Damaged locks, doors, or frames', 'Property-manager access needs'],
    scope: ['Lock replacement', 'Lockbox installation', 'Vacancy security work', 'Door and frame repair', 'Opening documentation'],
    process: commonProcess, rural: 'For remote locations, keying requirements, hardware type, gate access, and lockbox instructions should be settled before the trip.',
    faq: [{ question: 'Can you repair the door if the lock area is damaged?', answer: 'Often, yes. Door, frame, hardware, and localized opening repairs can be combined when the existing assembly is repairable.' }], related: ['window-door-replacement', 'trash-outs-property-cleanouts', 'property-maintenance']
  },
  {
    slug: 'accessibility-improvements', title: 'Accessibility Improvements', eyebrow: 'Practical Property Improvements',
    description: 'Construction improvements that make homes and light-commercial spaces easier and safer to access within Benson’s legal construction scope.',
    intro: 'Accessibility work should fit the actual user, route through the property, and building conditions. We focus on practical construction improvements and coordinate design or specialty requirements when they exceed a straightforward contractor scope.',
    problems: ['Difficult entries and thresholds', 'Need for rails, blocking, or safer access routes', 'Existing rooms requiring practical access improvements'],
    scope: ['Entry and threshold modifications', 'Grab-bar blocking and installation where appropriate', 'Door and hardware changes', 'Localized ramp or access construction where code and site conditions allow', 'Coordination for design requirements beyond our scope'],
    process: commonProcess, rural: 'Site measurements and user requirements are collected carefully so materials and layout are correct before remote mobilization.',
    faq: [{ question: 'Do you certify ADA compliance?', answer: 'We do not make blanket compliance certifications. For regulated commercial accessibility work, the applicable code and design requirements should be established for the specific project.' }], related: ['window-door-replacement', 'framing-structural-repairs', 'property-maintenance']
  },
  {
    slug: 'exterior-property-cleanup', title: 'Exterior Property Cleanup', eyebrow: 'Property & Site Care',
    description: 'Vegetation cutback, overgrowth cleanup, ordinary debris removal, and property preparation including non-regulated post-storm or post-fire work.',
    intro: 'Exterior cleanup is about restoring access and making the next maintenance or construction task possible. We separate ordinary cleanup from regulated waste, specialty tree work, and hazards that require another contractor.',
    problems: ['Overgrowth blocking structures or access', 'Ordinary exterior debris', 'Property preparation before repair or sale', 'Non-regulated storm or fire-related cleanup'],
    scope: ['Vegetation cutback', 'Overgrowth cleanup', 'Ordinary debris removal', 'Access and work-area preparation', 'Coordination with demolition or sitework'],
    process: commonProcess, rural: 'Burn restrictions, disposal distance, equipment access, weather, and fire-season conditions are considered before rural exterior work.',
    faq: [{ question: 'Does post-fire cleanup include burned-building ash?', answer: 'Not by default. Burned-building ash may contain regulated material and requires the proper assessment and disposal process before ordinary construction cleanup proceeds.' }], related: ['post-fire-property-cleanup', 'sitework-excavation', 'property-maintenance']
  },
  {
    slug: 'concrete-small-projects', title: 'Small Concrete Projects', eyebrow: 'Rural Construction',
    description: 'Equipment pads, utility pads, RV-related concrete, repairs, small slabs, and practical rural concrete projects.',
    intro: 'Small concrete can be difficult to source economically in remote country. We scope the pad, access, reinforcement, base, drainage, finish, and concrete logistics together so a small pour does not become a large mobilization problem.',
    problems: ['Utility or equipment pads', 'Small damaged slabs and pads', 'RV sanitation and service concrete', 'Remote projects below conventional batch-plant minimums'],
    scope: ['Small slabs and pads', 'Equipment and utility pads', 'RV-related concrete', 'Concrete repair and replacement', 'Base preparation, forming, placement, and finish'],
    process: commonProcess, rural: 'Batch minimums, haul time, temperature, placement crew, access, and hot-load risk can dominate a remote pour. The concrete supply plan is established before placement day.',
    faq: [{ question: 'Do you take on small remote pours?', answer: 'Yes, when the logistics and scope make sense. Remote concrete is evaluated around quantity, supplier distance, access, base work, and placement timing.' }], related: ['sitework-excavation', 'property-maintenance', 'demolition']
  },
];

export const serviceMap = Object.fromEntries(services.map(service => [service.slug, service])) as Record<string, ServicePage>;
export const wildfireServiceSlugs = ['post-fire-cleanup-recovery', 'fire-damage-demolition', 'fire-damage-repair-reconstruction', 'post-fire-property-cleanup'];
