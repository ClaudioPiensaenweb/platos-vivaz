import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

const LLMS_CONTENT = `# VIVAZ Clay Targets
> European leaders in ecological clay targets since 1967. Pioneers in 100% pine resin technology since 2001.

## Company
- Brand: VIVAZ Clay Targets
- Legal Name: Jes\u00fas y Vicente V\u00e1zquez S.L.
- Location: Calle Jes\u00fas S\u00e1nchez Mart\u00edn 3, 21360 Repilado (Jabugo), Huelva, Spain
- Founded: 1967
- Industry: Ecological clay target manufacturing / Olympic shooting sports
- Employees: 11-50
- Website: ${SITE_URL}
- LinkedIn: https://www.linkedin.com/company/vivaz-clay-targets-jesus-y-vicente-vazquez-sl/
- IWA OutdoorClassics exhibitor: https://www.iwa.info/en/exhibitors/vivaz-clay-targets-2484614

## Product Catalog

### Premium Natura Range (0 mg/kg PAH — 100% Pine Resin)
- **Natura 110**: Diameter 110mm, 105g. Disciplines: Olympic Trap, Universal Trap, Double Trap, Skeet, Sporting, Compak Sporting, FITASC. ISSF approved. ${SITE_URL}/productos/natura-110
- **Natura Rabbit**: Diameter 110mm. Discipline: Sporting. ${SITE_URL}/productos/natura-rabbit
- **Natura Battue**: Diameter 110mm. Disciplines: Battue, Sporting, FITASC. ${SITE_URL}/productos/natura-battue
- **Natura Extra Rabbit 110**: Diameter 110mm. Disciplines: Rabbit, Sporting. ${SITE_URL}/productos/natura-extra-rabbit-110
- **Natura Midi 90**: Diameter 90mm. Disciplines: Sporting, Compak Sporting. ${SITE_URL}/productos/natura-midi-90
- **Natura Mini Rabbit**: Diameter 60mm. Disciplines: Sporting, Compak Sporting. ${SITE_URL}/productos/natura-mini-rabbit
- **Natura Mini 60**: Diameter 60mm. Disciplines: Sporting, Compak Sporting. ${SITE_URL}/productos/natura-mini-60

### Eco Star Efficiency Range (<50 mg/kg PAH — Hybrid Ecological)
- **Eco Star 110**: Diameter 110mm. Discipline: Sporting. ${SITE_URL}/productos/eco-star-110

## EU Regulation 2025/660 (REACH)
- Regulation: EU 2025/660 amending REACH Annex XVII
- Effective date: April 22, 2026
- PAH limit: 50 mg/kg maximum per individual compound (18 regulated PAH substances)
- VIVAZ Natura range: 0 mg/kg PAH (exceeds requirements by 100%)
- VIVAZ Eco Star range: <50 mg/kg PAH (fully compliant)
- More info: ${SITE_URL}/regulacion-2026

## Technology
- 100% natural pine resin binder (Natura range) — zero petroleum derivatives
- Hybrid ecological binder (Eco Star range) — minimal environmental footprint
- Biodegradable materials: no toxic residue in soil or water
- ISSF approved for international competition
- ISO 14001 environmental management

## Key Differentiators
- Only European manufacturer offering 0 mg/kg PAH clay targets
- Pioneers in natural resin binder technology since 2001
- Over 57 years of continuous manufacturing (since 1967)
- Full product traceability and EU regulatory compliance
- Products for all competition disciplines: Olympic Trap, Skeet, Sporting, Compak, FITASC, Battue

## Pages
- Products: ${SITE_URL}/productos
- Technology & Sustainability: ${SITE_URL}/tecnologia
- About VIVAZ: ${SITE_URL}/sobre-vivaz
- EU 2026 Regulation: ${SITE_URL}/regulacion-2026
- News: ${SITE_URL}/noticias
- Contact: ${SITE_URL}/contacto

## Contact
- National (Spain): info@platosvivaz.com / +34 618 757 580
- Export (International): sales@vivazclaytargets.com / +34 606 172 746
`;

export async function GET() {
  return new NextResponse(LLMS_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
