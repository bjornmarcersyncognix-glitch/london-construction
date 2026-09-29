import type { ImageKey } from "./images";

/**
 * Service taxonomy and copy.
 *
 * Copy describes what each service is and what such work typically involves.
 * It deliberately avoids company-specific claims (accreditations, guarantees,
 * timescales, prices, statistics) that have not been supplied by the client.
 */

export type Service = {
  slug: string;
  name: string;
  /** One-line description used in lists and meta descriptions. */
  summary: string;
  intro: string;
  /** What the work can include. */
  scope: string[];
  /** Where the service is typically used. */
  applications: string[];
  /** Why careful execution matters for this kind of work. */
  care: string;
  image?: ImageKey;
  /** Slugs (category/service) of closely related services. */
  related?: string[];
};

export type Category = {
  slug: string;
  index: string;
  name: string;
  /** Short label for navigation. */
  short: string;
  summary: string;
  intro: string;
  image: ImageKey;
  services: Service[];
};

export const categories: Category[] = [
  {
    slug: "residential",
    index: "01",
    name: "Residential Construction",
    short: "Residential",
    summary: "New homes, extensions, loft and garage conversions, and garden buildings.",
    intro:
      "Adding space to a home, or building a new one, is one of the largest investments most people make. Our residential work covers the full range, from a single-storey rear extension to a complete new house, with the structural work, services and finishes needed to hand over a finished space.",
    image: "newbuild-frame",
    services: [
      {
        slug: "new-house-construction",
        name: "New House Construction",
        summary: "Building new homes from the ground up, from foundations to finished interiors.",
        intro:
          "A new house brings every construction discipline together on one plot: groundworks, structure, roof, services and finishes. We build new homes to the approved drawings, coordinating each stage so the building goes up in the right order and the finished house matches the design.",
        scope: [
          "Site preparation, groundworks and foundations",
          "Masonry, timber-frame or steel structures to the approved design",
          "Roof structure, coverings, windows and external doors",
          "First and second fix plumbing, heating and electrics",
          "Plastering, joinery, kitchens, bathrooms and decoration",
          "External works such as drives, paths and boundaries",
        ],
        applications: [
          "Self-build homes on a single plot",
          "Replacement dwellings where an existing house is demolished",
          "Small residential developments",
        ],
        care:
          "Mistakes made early in a new build, such as foundations set out incorrectly or a structure built out of tolerance, carry through to every later trade. Careful setting out, sequencing and inspection at each stage is what produces a house that is square, sound and finished well.",
        image: "newbuild",
        related: ["structural/groundworks-and-foundations", "exterior/roofing-and-roof-repairs", "residential/house-extensions"],
      },
      {
        slug: "house-extensions",
        name: "House Extensions",
        summary: "Single and double-storey extensions that add usable space to an existing home.",
        intro:
          "An extension is often the most practical way to gain a larger kitchen, an extra bedroom or a more open layout without moving. We build rear, side-return, wrap-around and two-storey extensions, including the structural openings that connect new space to the existing house.",
        scope: [
          "Foundations, drainage alterations and slab",
          "Brick and block walls matched to the existing house where required",
          "Steel beams and structural openings into the existing building",
          "Flat, pitched or glazed roofs and roof lights",
          "Bi-fold, sliding or French doors and windows",
          "Heating, electrics, plastering, flooring and decoration",
        ],
        applications: [
          "Kitchen-diner and family-room extensions",
          "Side-return extensions on terraced and semi-detached houses",
          "Two-storey extensions adding bedrooms and bathrooms",
        ],
        care:
          "An extension has to tie into a building that already exists, often one with its own quirks. Getting the junctions right — foundations, damp-proofing, roof abutments and the steelwork that opens up the rear wall — is what separates an extension that feels part of the house from one that feels bolted on.",
        image: "extension",
        related: ["structural/structural-alterations", "interiors/kitchen-installation-and-refurbishment", "residential/loft-conversions"],
      },
      {
        slug: "loft-conversions",
        name: "Loft Conversions",
        summary: "Turning unused roof space into bedrooms, bathrooms and studies.",
        intro:
          "Many houses have a loft that could become a proper room. Depending on the roof and the space available, that may mean a dormer, a hip-to-gable conversion, a mansard or a conversion with roof windows only. We carry out the structural and finishing work to turn the loft into a habitable floor.",
        scope: [
          "Dormer, hip-to-gable, mansard and roof-window conversions",
          "New floor joists and structural steelwork",
          "A new staircase to the converted floor",
          "Insulation, roof windows and dormer windows",
          "En-suite bathrooms, electrics and heating",
          "Plastering, joinery and decoration",
        ],
        applications: [
          "Additional bedrooms with en-suite bathrooms",
          "Home offices and studies",
          "Creating space in terraced and semi-detached houses",
        ],
        care:
          "A loft conversion changes how the house carries its loads and how people escape in a fire. The structure, the staircase and fire safety all need to meet Building Regulations, and good insulation and ventilation decide whether the new room is comfortable in summer and winter.",
        image: "loft",
        related: ["building-services/insulation-and-energy-efficiency", "exterior/roofing-and-roof-repairs", "interiors/bathroom-installation-and-refurbishment"],
      },
      {
        slug: "garage-conversions",
        name: "Garage Conversions",
        summary: "Converting integral or attached garages into living space.",
        intro:
          "An integral or attached garage can often be converted into a bedroom, office, playroom or utility space without extending the house. The work typically replaces the garage door with a wall and window, and brings the floor, walls and ceiling up to the standard of the rest of the home.",
        scope: [
          "Removing the garage door and building in a new wall and window",
          "Raising and insulating the floor",
          "Insulating walls and ceiling",
          "Electrics, heating and ventilation",
          "Plastering, flooring and decoration",
        ],
        applications: [
          "Home offices and studios",
          "Ground-floor bedrooms",
          "Utility rooms and playrooms",
        ],
        care:
          "Garages are built as unheated spaces, so floors, walls and foundations are often not designed for living in. Dealing properly with damp, insulation and the new infill wall is what makes a converted garage feel like a room rather than a garage with carpet.",
        related: ["residential/house-extensions", "building-services/insulation-and-energy-efficiency"],
      },
      {
        slug: "outbuildings",
        name: "Extensions and Outbuildings",
        summary: "Detached and attached outbuildings, annexes, workshops and stores.",
        intro:
          "Not every extra space needs to be attached to the house. We build outbuildings such as annexes, workshops, stores and garages, as well as smaller extensions like porches and utility rooms.",
        scope: [
          "Bases, slabs and foundations",
          "Masonry or timber-frame structures",
          "Roofs, windows and doors",
          "Power, lighting and, where needed, water and drainage",
          "Internal finishes",
        ],
        applications: [
          "Garages, workshops and stores",
          "Annexes for family members",
          "Porches and utility-room extensions",
        ],
        care:
          "Outbuildings are often treated as simpler projects, but they still need a proper base, a watertight envelope and services installed safely. Whether planning permission or Building Regulations apply depends on size, position and use, so these should be checked before work starts.",
        image: "extension-build",
        related: ["residential/garden-rooms-and-offices", "residential/house-extensions"],
      },
      {
        slug: "garden-rooms-and-offices",
        name: "Garden Rooms and Offices",
        summary: "Insulated garden buildings for working, studying or relaxing.",
        intro:
          "A well-built garden room gives a separate space to work, exercise or unwind, used all year round. We build insulated garden rooms and garden offices with proper bases, power and finishes.",
        scope: [
          "Concrete, pad or ground-screw bases",
          "Insulated timber structures and cladding",
          "Glazed doors and windows",
          "Power, lighting and data",
          "Internal lining, flooring and decoration",
        ],
        applications: [
          "Garden offices for working from home",
          "Studios, gyms and hobby rooms",
          "Additional living or guest space",
        ],
        care:
          "The difference between a garden room and a shed is the envelope: base, insulation, glazing and ventilation. Built properly, the room stays warm, dry and free of condensation through the winter.",
        image: "garden-room",
        related: ["residential/outbuildings", "exterior/patios-and-landscaping", "building-services/electrical-installation-and-repairs"],
      },
    ],
  },
  {
    slug: "commercial",
    index: "02",
    name: "Commercial Construction",
    short: "Commercial",
    summary: "Commercial buildings, refurbishment, shop fitting and office fit-out.",
    intro:
      "Commercial projects bring different pressures: occupied buildings, tenants, landlords and deadlines tied to opening or lease dates. We carry out commercial construction and refurbishment, retail and office fit-outs, and project management for commercial clients.",
    image: "commercial-tower",
    services: [
      {
        slug: "commercial-construction",
        name: "Commercial Construction",
        summary: "Construction of commercial premises and mixed-use buildings.",
        intro:
          "We build and extend commercial premises, working from the approved design through structure, envelope and services to a building ready for fit-out or occupation.",
        scope: [
          "Groundworks and foundations",
          "Steel, concrete and masonry structures",
          "Roofing, cladding and glazing",
          "Mechanical and electrical coordination",
          "Shell-and-core or fully finished handover",
        ],
        applications: [
          "Retail units and shopfronts",
          "Offices and workspaces",
          "Mixed-use buildings with commercial ground floors",
        ],
        care:
          "Commercial buildings are designed around specific loads, fire strategies and building services. Building faithfully to that design, and keeping clear records as the work goes up, matters for sign-off, for the tenant's fit-out and for the life of the building.",
        image: "commercial",
        related: ["structural/steel-and-structural-works", "commercial/construction-project-management", "exterior/exterior-cladding"],
      },
      {
        slug: "commercial-property-refurbishment",
        name: "Commercial Refurbishment",
        summary: "Refurbishing commercial property for new tenants, new uses or a new standard.",
        intro:
          "Refurbishment can reposition an ageing commercial building, prepare a unit for a new tenant or bring a property up to current standards. We carry out strip-outs, alterations and refurbishment of commercial space.",
        scope: [
          "Strip-out and making good",
          "Internal alterations and new partitions",
          "Ceilings, floors and wall finishes",
          "Upgrades to lighting, power, heating and ventilation",
          "Washrooms, kitchens and common areas",
        ],
        applications: [
          "Preparing vacant units for letting",
          "Updating common parts in multi-let buildings",
          "Change-of-use refurbishments",
        ],
        care:
          "Commercial refurbishment often happens in or around occupied space. Planning the work to control noise, dust and access — and keeping neighbouring occupiers informed — is as important as the quality of the finished space.",
        image: "commercial-refurb",
        related: ["commercial/office-fitting-and-refurbishment", "commercial/shop-fitting-and-refurbishment", "renovation/property-refurbishments"],
      },
      {
        slug: "shop-fitting-and-refurbishment",
        name: "Shop Fitting and Refurbishment",
        summary: "Retail fit-outs, shopfronts and store refurbishment.",
        intro:
          "A shop interior has to work hard: it presents the brand, displays stock and stands up to daily trade. We fit out and refurbish retail units, from the shell through to joinery, lighting and finishes.",
        scope: [
          "Shopfronts, entrances and signage zones",
          "Partitions, ceilings and floor finishes",
          "Bespoke joinery, counters and display units",
          "Lighting and power layouts",
          "Stock rooms, staff areas and washrooms",
        ],
        applications: [
          "New store openings",
          "Refits of existing shops",
          "Cafés, salons and showrooms",
        ],
        care:
          "Retail fit-outs usually run to a fixed opening date, and every day of delay is a day without trade. Good sequencing, early ordering of long-lead items and well-made joinery that survives heavy use make the difference.",
        image: "shopfit",
        related: ["interiors/carpentry-and-joinery", "commercial/commercial-property-refurbishment", "building-services/electrical-installation-and-repairs"],
      },
      {
        slug: "office-fitting-and-refurbishment",
        name: "Office Fit-Out and Refurbishment",
        summary: "Workplace fit-outs, alterations and refurbishment.",
        intro:
          "Offices need to adapt as teams change. We fit out new office space and refurbish existing workplaces, including partitions, meeting rooms, kitchens and the services behind them.",
        scope: [
          "Glazed and solid partitions, meeting rooms and doors",
          "Suspended ceilings and lighting",
          "Floor finishes and raised-floor alterations",
          "Power and data layouts",
          "Tea points, kitchens and washrooms",
        ],
        applications: [
          "Category A and Category B fit-outs",
          "Reconfiguring existing office layouts",
          "Refurbishing reception and breakout areas",
        ],
        care:
          "An office fit-out has to balance design, building services and the landlord's requirements. Coordinating these properly avoids rework and delivers a workplace that functions as well as it looks.",
        image: "office",
        related: ["commercial/commercial-property-refurbishment", "building-services/electrical-installation-and-repairs", "interiors/flooring-and-tiling"],
      },
      {
        slug: "construction-project-management",
        name: "Construction Project Management",
        summary: "Planning, coordinating and overseeing construction projects.",
        intro:
          "Construction projects involve many trades, suppliers and decisions. Project management keeps them coordinated: planning the programme, sequencing trades, tracking progress and keeping the client informed.",
        scope: [
          "Programme planning and sequencing",
          "Coordinating trades and suppliers",
          "Progress tracking and site oversight",
          "Liaison with designers, consultants and inspectors",
          "Handover and snagging",
        ],
        applications: [
          "Commercial refurbishments and fit-outs",
          "Larger residential projects",
          "Projects with several parallel workstreams",
        ],
        care:
          "Most problems on a building project come from coordination rather than workmanship: a trade arriving before the one it depends on, or a decision made too late. Clear planning and communication keep work moving and costs under control.",
        image: "project-management",
        related: ["commercial/commercial-construction", "residential/new-house-construction"],
      },
    ],
  },
  {
    slug: "renovation",
    index: "03",
    name: "Renovation and Refurbishment",
    short: "Renovation",
    summary: "Renovation, refurbishment, restoration and ongoing maintenance.",
    intro:
      "Existing buildings hold the most potential and the most surprises. Our renovation work ranges from full refurbishments of tired properties to careful restoration and the ongoing repairs that keep a building in good order.",
    image: "restoration-roof",
    services: [
      {
        slug: "property-renovations",
        name: "Property Renovations",
        summary: "Whole-house and partial renovations of existing homes and buildings.",
        intro:
          "A renovation brings a property back to life, whether that means reconfiguring rooms, renewing services or replacing worn-out finishes. We carry out renovations room by room or across a whole building.",
        scope: [
          "Internal alterations and new layouts",
          "Rewiring, re-plumbing and new heating",
          "Replastering and new joinery",
          "Kitchens, bathrooms and flooring",
          "Decoration throughout",
        ],
        applications: [
          "Newly purchased homes needing modernisation",
          "Inherited or long-held properties",
          "Preparing properties for sale or rental",
        ],
        care:
          "Opening up an older building often reveals issues such as failing wiring, damp or earlier poor-quality work. Dealing with these properly, rather than covering them up, is what gives a renovation a long life.",
        image: "renovation",
        related: ["renovation/property-refurbishments", "building-services/electrical-installation-and-repairs", "interiors/plastering-and-rendering"],
      },
      {
        slug: "property-refurbishments",
        name: "Property Refurbishments",
        summary: "Refurbishing homes and rental properties to a high standard.",
        intro:
          "Refurbishment updates a property's finishes and fittings without major structural change. It suits landlords between tenancies, homeowners updating a property and investors preparing a property for the market.",
        scope: [
          "Kitchen and bathroom replacement",
          "Flooring, plastering and decoration",
          "Doors, skirting and joinery",
          "Lighting and electrical upgrades",
          "Making good and repairs",
        ],
        applications: [
          "Rental properties between tenancies",
          "Properties being prepared for sale",
          "Homes needing a full cosmetic update",
        ],
        care:
          "A refurbishment is judged on its finish. Careful preparation, straight lines and clean junctions make the difference between a property that looks renewed and one that looks patched.",
        image: "refurbishment",
        related: ["renovation/property-renovations", "interiors/painting-and-decorating", "interiors/kitchen-installation-and-refurbishment"],
      },
      {
        slug: "building-restoration",
        name: "Building Restoration",
        summary: "Repairing and restoring older and period buildings.",
        intro:
          "Period buildings were built with different materials and methods from modern ones. Restoration work repairs facades, roofs, masonry and joinery in a way that respects how the building was originally constructed.",
        scope: [
          "Masonry repairs and repointing",
          "Facade cleaning and repair",
          "Roof and chimney repairs",
          "Repair or replacement of period joinery",
          "Scaffolding and access for high-level work",
        ],
        applications: [
          "Victorian, Edwardian and Georgian houses",
          "Period commercial buildings",
          "Buildings in conservation areas",
        ],
        care:
          "Using modern materials on old buildings — cement mortars on soft brick, for example — can trap moisture and cause lasting damage. Restoration needs materials and techniques compatible with the original building.",
        image: "restoration",
        related: ["structural/brickwork-and-blockwork", "exterior/roofing-and-roof-repairs", "interiors/carpentry-and-joinery"],
      },
      {
        slug: "property-maintenance-and-repairs",
        name: "Property Maintenance and Repairs",
        summary: "Planned maintenance and repairs for homes and commercial property.",
        intro:
          "Regular maintenance prevents small problems from becoming large ones. We carry out repairs and maintenance for homeowners, landlords and commercial property owners.",
        scope: [
          "General building repairs",
          "Roof, gutter and drainage repairs",
          "Repairs to doors, windows and joinery",
          "Plumbing and electrical repairs",
          "Redecoration and making good",
        ],
        applications: [
          "Rental property maintenance",
          "Commercial premises",
          "Ongoing care of family homes",
        ],
        care:
          "A repair done properly the first time — finding the cause of a leak rather than treating the stain — saves repeat call-outs and protects the building fabric.",
        image: "maintenance",
        related: ["renovation/general-building-and-maintenance-services", "exterior/roofing-and-roof-repairs", "building-services/plumbing-installation-and-repairs"],
      },
      {
        slug: "general-building-and-maintenance-services",
        name: "General Building Services",
        summary: "General building work for projects of any size.",
        intro:
          "Not every job fits a neat category. We take on general building work, from alterations and repairs to small projects that need several trades.",
        scope: [
          "Alterations and knock-throughs",
          "Brickwork, carpentry and plastering",
          "Repairs and making good",
          "Coordinating multiple trades",
        ],
        applications: [
          "Small projects across several trades",
          "Preparatory works before larger projects",
          "Remedial work",
        ],
        care:
          "Small jobs still need the right trade, the right materials and proper finishing. Treating them with the same care as larger work gives a result that lasts.",
        related: ["renovation/property-maintenance-and-repairs", "structural/structural-alterations"],
      },
    ],
  },
  {
    slug: "structural",
    index: "04",
    name: "Structural and Groundworks",
    short: "Structural",
    summary: "Structural alterations, foundations, masonry, concrete, steel and demolition.",
    intro:
      "Everything else depends on the structure. Our structural and groundworks services cover the work that creates and supports buildings: foundations, masonry, concrete, steelwork, and the demolition and clearance that often come first.",
    image: "structural-open",
    services: [
      {
        slug: "structural-alterations",
        name: "Structural Alterations",
        summary: "Removing walls, forming openings and installing steelwork.",
        intro:
          "Opening up a home — removing a load-bearing wall, widening an opening or creating an open-plan space — needs the load above to be carried safely. We install steel beams, padstones and supports to the structural engineer's design.",
        scope: [
          "Removal of load-bearing and non-load-bearing walls",
          "Steel beams, padstones and posts",
          "Temporary propping and needling",
          "Forming new door and window openings",
          "Making good to walls, floors and ceilings",
        ],
        applications: [
          "Open-plan kitchen and living spaces",
          "Rear-wall openings for extensions",
          "Chimney breast removal",
        ],
        care:
          "Structural alterations must follow a structural engineer's calculations and are subject to Building Regulations. Correct temporary support during the work is as important as the permanent steelwork.",
        image: "structural",
        related: ["structural/steel-and-structural-works", "residential/house-extensions"],
      },
      {
        slug: "groundworks-and-foundations",
        name: "Groundworks and Foundations",
        summary: "Excavation, foundations, slabs and below-ground work.",
        intro:
          "Groundworks prepare a site and give a building something solid to stand on. We carry out excavation, foundations, below-ground drainage and ground-floor slabs.",
        scope: [
          "Site set-out and excavation",
          "Strip, trench-fill and raft foundations",
          "Below-ground drainage",
          "Ground-bearing and suspended floor slabs",
          "Spoil removal and site levelling",
        ],
        applications: [
          "New build houses",
          "Extensions and outbuildings",
          "Commercial projects",
        ],
        care:
          "Foundations are designed around the ground conditions, and mistakes are buried and expensive to fix. Accurate setting out and inspection before concrete is poured protect everything built above.",
        image: "groundworks",
        related: ["structural/concrete-works", "exterior/drainage-works", "residential/new-house-construction"],
      },
      {
        slug: "brickwork-and-blockwork",
        name: "Brickwork and Blockwork",
        summary: "Structural and facing masonry, repairs and repointing.",
        intro:
          "Masonry is the backbone of most British buildings. We build new brick and block walls and repair existing masonry, matching bricks, bond and mortar where new work meets old.",
        scope: [
          "Cavity walls in brick and block",
          "Facing brickwork matched to existing buildings",
          "Garden and boundary walls",
          "Repointing and brick repairs",
          "Chimney rebuilding and repairs",
        ],
        applications: [
          "Extensions and new builds",
          "Boundary walls",
          "Repairs to period properties",
        ],
        care:
          "Good brickwork is both structural and visual. Level courses, consistent joints and bricks matched to the existing building are what make new masonry look as if it was always there.",
        image: "brickwork",
        related: ["renovation/building-restoration", "residential/house-extensions"],
      },
      {
        slug: "concrete-works",
        name: "Concrete Works",
        summary: "Slabs, bases, reinforced concrete and structural concrete work.",
        intro:
          "Concrete forms many of the hidden parts of a building. We carry out concrete work including foundations, slabs, bases and reinforced elements.",
        scope: [
          "Foundations and ground-floor slabs",
          "Reinforcement fixing",
          "Formwork and shuttering",
          "Bases for outbuildings and plant",
          "Screeds and levelling",
        ],
        applications: [
          "New builds and extensions",
          "Commercial slabs and bases",
          "Garden buildings and hard landscaping",
        ],
        care:
          "Concrete performance depends on the mix, the reinforcement, compaction and curing. Getting these right on the day determines the strength and durability of the finished element.",
        image: "concrete",
        related: ["structural/groundworks-and-foundations", "structural/steel-and-structural-works"],
      },
      {
        slug: "steel-and-structural-works",
        name: "Steel and Structural Works",
        summary: "Structural steel installation for homes and commercial buildings.",
        intro:
          "Steel lets buildings span further and open up. We install structural steelwork from single beams in homes to steel frames on commercial projects, working to the engineer's design.",
        scope: [
          "Beams, columns and goalpost frames",
          "Steel frames for commercial buildings",
          "Connections, bearings and padstones",
          "Fire protection to steelwork where specified",
        ],
        applications: [
          "Open-plan alterations and extensions",
          "Loft conversions",
          "Commercial construction",
        ],
        care:
          "Steelwork is only as good as its connections and bearings. Installing to the engineer's specification — and protecting the steel where required — ensures it performs as designed.",
        image: "steel",
        related: ["structural/structural-alterations", "commercial/commercial-construction"],
      },
      {
        slug: "demolition-and-site-clearance",
        name: "Demolition and Site Clearance",
        summary: "Controlled demolition, strip-out and clearing sites for development.",
        intro:
          "Many projects start by taking something away. We carry out demolition, strip-out and site clearance to prepare sites for new construction.",
        scope: [
          "Demolition of buildings and structures",
          "Soft strip and internal strip-out",
          "Site clearance and vegetation removal",
          "Removal and disposal of waste",
        ],
        applications: [
          "Replacement dwellings",
          "Development sites",
          "Commercial strip-out before refurbishment",
        ],
        care:
          "Demolition needs to be planned around neighbouring buildings, services and any hazardous materials. A controlled approach keeps the site and its surroundings safe.",
        image: "demolition",
        related: ["structural/groundworks-and-foundations", "residential/new-house-construction"],
      },
    ],
  },
  {
    slug: "exterior",
    index: "05",
    name: "Roofing and Exterior",
    short: "Exterior",
    summary: "Roofing, cladding, windows and doors, driveways, landscaping and drainage.",
    intro:
      "The outside of a building protects everything within it and shapes the first impression it makes. Our exterior services cover the roof, the walls, the openings and the ground around the building.",
    image: "arch-detail",
    services: [
      {
        slug: "roofing-and-roof-repairs",
        name: "Roofing and Roof Repairs",
        summary: "New roofs, re-roofing and roof repairs for pitched and flat roofs.",
        intro:
          "A roof has one job, and when it fails the damage spreads. We install new roofs, re-roof existing buildings and carry out repairs to pitched and flat roofs.",
        scope: [
          "Tiled and slate pitched roofs",
          "Flat roofing systems",
          "Battens, membranes and insulation",
          "Leadwork, flashings and valleys",
          "Fascias, soffits and guttering",
          "Repairs to leaks and storm damage",
        ],
        applications: [
          "New builds and extensions",
          "Re-roofing older properties",
          "Repairs following leaks or storm damage",
        ],
        care:
          "Most roof leaks start at the details: flashings, valleys and junctions with walls and chimneys. Careful detailing and ventilation extend the life of the roof and the building beneath it.",
        image: "roofing",
        related: ["residential/loft-conversions", "renovation/building-restoration", "building-services/insulation-and-energy-efficiency"],
      },
      {
        slug: "exterior-cladding",
        name: "Exterior Cladding",
        summary: "Timber, composite and other cladding systems.",
        intro:
          "Cladding changes the look and performance of a building's walls. We install cladding on extensions, garden buildings and commercial buildings.",
        scope: [
          "Timber and composite cladding",
          "Battens, membranes and cavity barriers",
          "Detailing around windows, doors and corners",
          "Replacement of existing cladding",
        ],
        applications: [
          "Contemporary extensions",
          "Garden rooms and outbuildings",
          "Commercial facades",
        ],
        care:
          "Cladding relies on correct fixing, ventilation behind the boards and fire-safe detailing. These are invisible once finished but decide how the cladding weathers and performs.",
        image: "cladding",
        related: ["residential/garden-rooms-and-offices", "commercial/commercial-construction"],
      },
      {
        slug: "windows-and-doors-installation",
        name: "Windows and Doors",
        summary: "Installation of windows, external doors and glazed screens.",
        intro:
          "Windows and doors affect light, security and energy efficiency. We install windows, external doors and glazed doors in new openings and as replacements.",
        scope: [
          "Replacement windows",
          "Bi-fold, sliding and French doors",
          "Front and back doors",
          "Roof windows",
          "Making good to reveals, sills and plaster",
        ],
        applications: [
          "Extensions and loft conversions",
          "Whole-house window replacement",
          "Upgrading security and efficiency",
        ],
        care:
          "Even a high-quality window performs poorly if it is badly fitted. Correct sizing, fixing, sealing and cavity closing keep out draughts and water.",
        image: "windows",
        related: ["residential/house-extensions", "building-services/insulation-and-energy-efficiency"],
      },
      {
        slug: "driveways-and-paving",
        name: "Driveways and Paving",
        summary: "Block paving, driveways and paved areas.",
        intro:
          "A driveway has to carry vehicles for years without sinking or cracking. We lay driveways and paved areas on properly prepared sub-bases.",
        scope: [
          "Excavation and sub-base preparation",
          "Block paving and paving slabs",
          "Edgings, kerbs and steps",
          "Surface drainage",
        ],
        applications: [
          "New and replacement driveways",
          "Paths and paved areas",
          "Commercial forecourts",
        ],
        care:
          "What sits under a driveway matters more than the surface. The depth and compaction of the sub-base, and how water drains away, decide whether it stays level.",
        image: "driveway",
        related: ["exterior/patios-and-landscaping", "exterior/drainage-works"],
      },
      {
        slug: "patios-and-landscaping",
        name: "Patios and Landscaping",
        summary: "Patios, terraces and hard landscaping.",
        intro:
          "A well-built patio extends living space into the garden. We build patios, terraces, steps and garden walls as part of wider garden projects.",
        scope: [
          "Stone and porcelain patios",
          "Steps, retaining walls and raised beds",
          "Paths and edging",
          "Levels and drainage",
        ],
        applications: [
          "Garden terraces beside extensions",
          "Complete garden transformations",
          "Commercial outdoor spaces",
        ],
        care:
          "Patios need falls to shed water away from the house and must not bridge the damp-proof course. Getting levels right protects both the patio and the building.",
        image: "patio",
        related: ["exterior/driveways-and-paving", "exterior/fencing-and-gates", "residential/garden-rooms-and-offices"],
      },
      {
        slug: "fencing-and-gates",
        name: "Fencing and Gates",
        summary: "Timber fencing, boundary treatments and gates.",
        intro:
          "Boundaries provide privacy and security. We install fences and gates, from close-board timber fencing to bespoke boundary treatments.",
        scope: [
          "Close-board and panel fencing",
          "Posts set in concrete or on bases",
          "Pedestrian and vehicle gates",
          "Replacement of damaged fencing",
        ],
        applications: [
          "Garden boundaries",
          "Front gardens and driveways",
          "Commercial sites",
        ],
        care:
          "Fences fail at the posts. Correct post depth, spacing and fixings keep a fence straight through wind and weather.",
        image: "fencing",
        related: ["exterior/patios-and-landscaping", "exterior/driveways-and-paving"],
      },
      {
        slug: "drainage-works",
        name: "Drainage Works",
        summary: "Below-ground drainage, connections and repairs.",
        intro:
          "Drainage is rarely seen but always needed. We install new drainage for building projects and repair or alter existing drainage.",
        scope: [
          "Foul and surface water drainage",
          "Connections to existing systems",
          "Inspection chambers",
          "Soakaways",
          "Repairs and diversions",
        ],
        applications: [
          "Extensions built over or near drains",
          "New builds",
          "Resolving drainage problems",
        ],
        care:
          "Drains depend on correct falls, bedding and connections. Mistakes are buried and often surface only as blockages or leaks later.",
        image: "drainage",
        related: ["structural/groundworks-and-foundations", "exterior/driveways-and-paving"],
      },
    ],
  },
  {
    slug: "interiors",
    index: "06",
    name: "Interiors and Finishing",
    short: "Interiors",
    summary: "Joinery, plastering, decorating, flooring, kitchens and bathrooms.",
    intro:
      "Finishing is where a building becomes a place to live or work, and where quality is most visible. Our interior services cover the trades that turn a structure into a finished space.",
    image: "interiors",
    services: [
      {
        slug: "carpentry-and-joinery",
        name: "Carpentry and Joinery",
        summary: "Structural carpentry, first and second fix, and bespoke joinery.",
        intro:
          "Carpentry runs through a building from structure to finish. We carry out structural carpentry, first and second fix and bespoke joinery.",
        scope: [
          "Floor joists, stud walls and roof structures",
          "Doors, frames, skirting and architrave",
          "Staircases",
          "Built-in storage and bespoke joinery",
        ],
        applications: [
          "New builds, extensions and loft conversions",
          "Renovation and refurbishment",
          "Retail and office fit-outs",
        ],
        care:
          "Joinery is judged at close range. Accurate cutting, tight joints and clean finishes are what make woodwork look crafted rather than assembled.",
        image: "carpentry",
        related: ["commercial/shop-fitting-and-refurbishment", "residential/loft-conversions"],
      },
      {
        slug: "plastering-and-rendering",
        name: "Plastering and Rendering",
        summary: "Internal plastering, skimming and external render.",
        intro:
          "Plaster and render create the surfaces everything else is applied to. We carry out internal plastering, skimming, dry-lining and external render.",
        scope: [
          "Skimming and replastering",
          "Plasterboard and dry-lining",
          "Coving and cornice repairs",
          "External render systems",
        ],
        applications: [
          "Renovations and refurbishments",
          "New builds and extensions",
          "Repairs after structural work",
        ],
        care:
          "Flat, smooth plaster makes decoration look better and last longer. External render must suit the wall behind it so that moisture can escape.",
        image: "plastering",
        related: ["interiors/painting-and-decorating", "renovation/property-renovations"],
      },
      {
        slug: "painting-and-decorating",
        name: "Painting and Decorating",
        summary: "Interior and exterior painting and decorating.",
        intro:
          "Decoration is the final layer of most projects. We carry out interior and exterior painting and decorating, with the preparation that a lasting finish needs.",
        scope: [
          "Surface preparation, filling and sanding",
          "Walls, ceilings and woodwork",
          "Exterior masonry and joinery",
          "Wallpapering",
        ],
        applications: [
          "Completing renovations and extensions",
          "Rental properties between tenancies",
          "Commercial premises",
        ],
        care:
          "Most of a good paint finish is preparation. Proper filling, sanding and priming decide how the finished surface looks and how long it lasts.",
        image: "painting",
        related: ["interiors/plastering-and-rendering", "renovation/property-refurbishments"],
      },
      {
        slug: "flooring-and-tiling",
        name: "Flooring and Tiling",
        summary: "Floor and wall tiling, timber and other floor finishes.",
        intro:
          "Floors take the most wear in any building. We install floor and wall tiling, timber, laminate and other finishes, with the subfloor preparation they need.",
        scope: [
          "Subfloor preparation and levelling",
          "Floor and wall tiling",
          "Engineered timber and laminate",
          "Underfloor heating coordination",
        ],
        applications: [
          "Kitchens and bathrooms",
          "Hallways and living spaces",
          "Commercial interiors",
        ],
        care:
          "Tiles crack and floors squeak when the base beneath them moves. Preparing a flat, stable subfloor is what makes a floor last.",
        image: "flooring",
        related: ["interiors/bathroom-installation-and-refurbishment", "interiors/kitchen-installation-and-refurbishment"],
      },
      {
        slug: "kitchen-installation-and-refurbishment",
        name: "Kitchens",
        summary: "Kitchen installation and refurbishment.",
        intro:
          "The kitchen is often the most-used room in the house. We install new kitchens and refurbish existing ones, including the building work, services and finishes around them.",
        scope: [
          "Strip-out of existing kitchens",
          "Plumbing, electrics and extraction",
          "Unit and worktop installation",
          "Tiling, flooring and decoration",
        ],
        applications: [
          "New kitchens in extensions",
          "Replacing existing kitchens",
          "Kitchens in rental properties",
        ],
        care:
          "A kitchen brings together plumbing, electrics, gas and joinery in a small space. Coordinating the services before the units go in avoids compromises later.",
        image: "kitchen",
        related: ["residential/house-extensions", "interiors/flooring-and-tiling", "building-services/plumbing-installation-and-repairs"],
      },
      {
        slug: "bathroom-installation-and-refurbishment",
        name: "Bathrooms",
        summary: "Bathroom, shower room and en-suite installation.",
        intro:
          "Bathrooms need to look good and stay watertight. We install bathrooms, shower rooms and en-suites, from the pipework to the final finishes.",
        scope: [
          "Strip-out and preparation",
          "Plumbing and waste",
          "Waterproofing and tanking",
          "Tiling and sanitaryware",
          "Lighting and extraction",
        ],
        applications: [
          "Family bathroom refurbishments",
          "En-suites in loft conversions",
          "Shower rooms and cloakrooms",
        ],
        care:
          "Water finds the smallest gap. Proper waterproofing behind the tiles and correctly installed waste pipework prevent leaks that can damage the rooms below.",
        image: "bathroom",
        related: ["interiors/flooring-and-tiling", "building-services/plumbing-installation-and-repairs", "residential/loft-conversions"],
      },
    ],
  },
  {
    slug: "building-services",
    index: "07",
    name: "Building Services",
    short: "Systems",
    summary: "Plumbing, electrics, heating, insulation and energy efficiency.",
    intro:
      "Building services are what make a building work: water, power, heat and a comfortable interior. We install and upgrade these systems as part of wider building projects and as standalone work.",
    image: "pipework",
    services: [
      {
        slug: "plumbing-installation-and-repairs",
        name: "Plumbing",
        summary: "Plumbing installation, alterations and repairs.",
        intro:
          "We carry out plumbing for new installations, alterations and repairs, from a single leaking pipe to complete new systems.",
        scope: [
          "Hot and cold water supplies",
          "Waste and soil pipework",
          "Kitchen and bathroom plumbing",
          "Leak repairs",
        ],
        applications: [
          "Kitchen and bathroom projects",
          "Extensions and conversions",
          "Repairs and maintenance",
        ],
        care:
          "Plumbing hidden in walls and floors has to be right first time. Correctly sized, supported and tested pipework prevents leaks and poor water pressure.",
        image: "plumbing",
        related: ["building-services/heating-installation", "interiors/bathroom-installation-and-refurbishment"],
      },
      {
        slug: "electrical-installation-and-repairs",
        name: "Electrical",
        summary: "Electrical installations, rewiring and repairs.",
        intro:
          "We carry out electrical installation for building projects, including rewiring, new circuits, lighting and repairs.",
        scope: [
          "Full and partial rewires",
          "Consumer unit replacement",
          "New circuits, sockets and lighting",
          "Fault finding and repairs",
        ],
        applications: [
          "Extensions and loft conversions",
          "Renovations of older properties",
          "Commercial fit-outs",
        ],
        care:
          "Electrical work in homes is covered by Building Regulations, and safety depends on correct design, installation and testing. Work should be tested and certified on completion.",
        image: "electrical",
        related: ["building-services/heating-installation", "renovation/property-renovations"],
      },
      {
        slug: "heating-installation",
        name: "Heating",
        summary: "Heating system installation and upgrades.",
        intro:
          "We install and upgrade heating systems, including radiators, underfloor heating and the pipework that connects them.",
        scope: [
          "Radiator installation and replacement",
          "Underfloor heating",
          "Heating pipework",
          "Extending heating into extensions and conversions",
        ],
        applications: [
          "Extensions and loft conversions",
          "Whole-house renovations",
          "Upgrading older systems",
        ],
        care:
          "A heating system has to be sized for the building. Radiators, pipework and controls that suit the space make a home comfortable and efficient to run.",
        image: "heating",
        related: ["building-services/plumbing-installation-and-repairs", "building-services/insulation-and-energy-efficiency"],
      },
      {
        slug: "insulation-and-energy-efficiency",
        name: "Insulation and Energy Efficiency",
        summary: "Insulation and improvements that reduce heat loss.",
        intro:
          "Keeping heat in is often the most effective energy improvement. We install insulation to roofs, walls and floors, and make other improvements that reduce heat loss.",
        scope: [
          "Loft and roof insulation",
          "Wall insulation",
          "Floor insulation",
          "Draught-proofing",
          "Window and door upgrades",
        ],
        applications: [
          "Older, draughty homes",
          "Loft conversions and extensions",
          "Improving a property's energy performance",
        ],
        care:
          "Insulation has to work with the building's ventilation. Installed without care, it can cause condensation and damp; installed properly, it keeps the building warm and dry.",
        image: "insulation",
        related: ["residential/loft-conversions", "exterior/windows-and-doors-installation", "building-services/heating-installation"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

export const allServices = categories.flatMap((c) =>
  c.services.map((s) => ({ ...s, category: c })),
);

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getService(categorySlug: string, serviceSlug: string) {
  const category = getCategory(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  return category && service ? { category, service } : undefined;
}

export function serviceHref(categorySlug: string, serviceSlug: string) {
  return `/services/${categorySlug}/${serviceSlug}`;
}

/** Resolves "category/service" references into linkable entries. */
export function resolveRelated(refs: string[] = []) {
  return refs
    .map((ref) => {
      const [c, s] = ref.split("/");
      return getService(c, s);
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
}

/** Project types offered in the enquiry form. */
export const projectTypes = [
  ...categories.map((c) => c.name),
  "Something else",
];
