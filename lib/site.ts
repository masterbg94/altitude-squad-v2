// EDIT THIS FILE: all text, contacts and SEO data live here.
export const site = {
  name: "Summit Rope Squad",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  city: "Belgrade, Serbia",
  email: "hello@example.com",
  phone: "+381 60 000 0000",
  tagline: "Rope access teams for work where a lift can't reach.",
  description:
    "Four certified rope access technicians for facade cleaning, inspection, repair and painting on tall buildings, bridges, chimneys and towers.",
  services: [
    ["Inspection and surveys", "Close visual checks, photo and drop surveys, and asset condition reports where a drone or lift can't get close enough.", ["Facade, roof and chimney inspection", "Bridge and structure surveys", "Photo and video reports", "Corrosion and erosion checks"]],
    ["Non-destructive testing", "Testing done on the structure itself, with no need to build access first.", ["Ultrasonic thickness measurement", "Magnetic particle and dye penetrant", "Visual and eddy current checks", "Findings in a written report"]],
    ["Cleaning", "Top-down cleaning of surfaces that are too tall, too steep or too fragile for machines.", ["Glass and curtain wall", "Stone, cladding and concrete", "Industrial and end-of-construction clean-downs", "Bird and debris removal"]],
    ["Repair and maintenance", "Fixes made in place, so the building or plant keeps running.", ["Cracks, joints and sealants", "Waterproofing and insulation repair", "Anchor and fixing work", "Rockfall and slope maintenance"]],
    ["Painting and coatings", "Surface preparation and protective coatings on steel and masonry.", ["Blasting and surface prep", "Protective and decorative coatings", "Coating inspection", "Silos, tanks, towers and bridges"]],
    ["Installation", "Fitting equipment and structures at height.", ["Signs, banners and lighting", "Cameras, antennas and sensors", "Bird netting and fall arrest lines", "Safety systems"]],
    ["Safety and rescue", "Planning and standby support for anyone working at height or in confined spaces.", ["Rescue standby teams", "Access planning", "Risk assessment and method statements", "Safety consulting"]],
    ["Training", "Hands-on rope work and rescue instruction for your own staff.", ["Introduction to rope work", "Rescue drills", "Gear inspection basics"]],
  ] as [string, string, string[]][],
  industries: ["Commercial buildings", "Bridges and tunnels", "Industrial plants", "Chimneys and silos", "Wind and telecom towers", "Dams and slopes", "Churches and heritage sites", "Residential towers"],
  faq: [
    ["What is rope access?", "A method of working at height using two separately anchored ropes, a working line and a safety line, together with climbing techniques. It is often used instead of scaffolding or lifting platforms."],
    ["Is rope access cheaper than scaffolding?", "Often, yes. There is no scaffold to build, hire or remove, and setup takes hours instead of days. For a very large or long job scaffolding can still win, and we will tell you."],
    ["Do you work in winter or in wind?", "We work in cold weather. We stop when wind, rain or ice make the work unsafe. We agree a backup date with you before we start."],
    ["Do you carry insurance?", "Yes. Ask us for the certificate and our method statement before any job."],
    ["How fast can you start?", "Small jobs often start within a week. Send the address and photos and we'll give a date with the quote."],
  ] as [string, string][],
  reasons: [
    ["Small team, direct contact", "You talk to the people who do the work. No subcontractor chain."],
    ["Safety first", "Two-rope systems, daily gear checks and a rescue plan on every job."],
    ["Faster than scaffolding", "We start in hours, not days, and leave nothing behind."],
  ] as [string, string][],
  team: [
    ["Marko", "Team lead", "Planning, inspection and client contact"],
    ["Ana", "Rope access technician", "Facade repair and coatings"],
    ["Luka", "Rope access technician", "Cleaning and installation"],
    ["Ivana", "Safety and rescue", "Gear checks and rescue planning"],
  ] as [string, string, string][],
  steps: [
    ["Tell us about the site", "Send photos or the address and what needs doing."],
    ["Site visit and quote", "We check access and anchor points, then send a fixed price."],
    ["Work at height", "We rig, work and de-rig. You keep using the building."],
    ["Report", "You get photos of the finished work and any findings."],
  ] as [string, string][],
};
